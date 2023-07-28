class Video < ApplicationRecord
  include SongLive

  belongs_to :channel
  has_many :song_items, dependent: :destroy
  has_many :comments, dependent: :destroy
  validates :video_id, presence: true, uniqueness: true
  scope :displayed, -> { where(published: true) }

  enum kind: {
    video: 0,
    live: 10,
    short: 20
  }, _prefix: true

  # 方針: コメントを探しに行く→セトリ作成→過去のSongDiffからauthorを埋める→Spotifyを使用
  # ただしSpotifyは精度が低いためspotify_completedの場合も適宜過去のSongDiffからauthorを更新する
  enum status: {
    ready: 0,
    fetched: 10, # コメントにセトリを探しに行った
    song_items_created: 20, # セトリ(SongItem)を作成した
    fetched_history: 25, # 過去のSongDiffを見てauthorの空白部分で埋められる部分を埋めた
    spotify_fetched: 30, # spotifyのデータからauthorの空白部分で埋められる部分を埋めた
    spotify_completed: 35, # spotifyのデータからauthorの空白部分を埋めた
    completed: 40 # time, title, authorが埋まった
  }, _prefix: true

  def self.fetch_and_create!(video_ids)
    response = Youtube.get_videos(video_ids)
    videos = []
    response.items.each do |item|
      # 与えられたチャンネルの動画ではない場合はskip
      next if new.channel.present? && new.channel.channel_id != item.snippet.channel_id

      channel = Channel.find_by(channel_id: item.snippet.channel_id)
      next if channel.blank? # チャンネルがDBに存在しない場合

      video = Video.find_or_initialize_by(video_id: item.id)

      kind = item.live_streaming_details.present? ? 'live' : 'video'
      published_at = item.live_streaming_details&.actual_start_time \
            || item.live_streaming_details&.scheduled_start_time \
            || item.snippet.published_at

      video.update!(
        video_id: item.id,
        title: item.snippet.title,
        response_json: item.to_h,
        kind:,
        channel_id: channel.id,
        published_at:
      )
      videos.push(video)
    end
    videos
  end

  # {
  #   default: {
  #     width: number,
  #     height: number,
  #     url: string,
  #   },
  #   medium: {
  #     width: number,
  #     height: number,
  #     url: string,
  #   },
  #   high: {
  #     width: number,
  #     height: number,
  #     url: string,
  #   },
  # }
  def thumbnails
    response_json.dig('snippet', 'thumbnails')
  end

  def description
    response_json.dig('snippet', 'description')
  end

  def link_url
    Youtube::ENDPOINT + "watch?v=#{video_id}"
  end
end
