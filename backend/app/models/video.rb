class Video < ApplicationRecord
  include SongLive

  belongs_to :channel
  has_many :song_items, dependent: :destroy
  has_many :comments, dependent: :destroy
  validates :video_id, presence: true, uniqueness: true

  enum kind: {
    video: 0,
    live: 10,
    short: 20
  }, _prefix: true

  # コメントにセトリを探しに行ったらfetched
  # セトリが確定したら(= セトリが見つかった or 歌枠ではなかったら)completed
  enum status: {
    ready: 0,
    fetched: 10,
    completed: 20
  }, _prefix: true

  def self.fetch_and_create!(video_id)
    response = Youtube.get_videos([video_id])
    response.items.each do |item|
      # 与えられたチャンネルの動画ではない場合はskip
      next if new.channel.present? && new.channel.channel_id != item.snippet.channel_id

      channel = Channel.find_by(channel_id: item.snippet.channel_id)
      next if channel.blank? # チャンネルがDBに存在しない場合

      video = Video.find_or_initialize_by(video_id:)

      kind = item.live_streaming_details.present? ? 'live' : 'video'
      published_at = item.live_streaming_details&.actual_start_time \
            || item.live_streaming_details&.scheduled_start_time \
            || item.snippet.published_at

      video.update!(
        video_id:,
        title: item.snippet.title,
        response_json: item.to_h,
        kind:,
        channel_id: channel.id,
        published_at:
      )
    end
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

  def published_at
    Time.zone.parse(response_json.dig('snippet', 'published_at'))
  end
end
