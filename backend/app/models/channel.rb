class Channel < ApplicationRecord
  has_many :videos, dependent: :destroy
  validates :channel_id, presence: true, uniqueness: true
  has_many :all_song_items, through: :videos, class_name: 'SongItem', source: :song_items

  enum :kind, {
    hidden: 0,
    published: 100
  }, prefix: true

  enum :status, {
    ready: 0,
    videos_fetched: 50
  }, prefix: true

  def self.fetch_and_create!(channel_ids)
    response = Youtube.get_channels(channel_ids)
    channels = []

    response.items.each do |item|
      channel = Channel.find_or_initialize_by(channel_id: item.id)
      channel.update!(
        channel_id: item.id,
        name: item.snippet.title,
        response_json: item.to_h
      )
      channels.push(channel)
    end
    channels
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
    response_json['snippet']['thumbnails']
  end

  def description
    response_json['snippet']['description']
  end

  def custom_id
    response_json['snippet']['custom_url']
  end

  def search_and_create_recent_videos
    video_ids = Youtube.get_recent_video_ids(channel_id)
    videos.fetch_and_create!(video_ids)
  end

  def search_and_create_all_videos
    video_ids = Youtube.get_all_video_ids(custom_id)
    i = 0
    while i * 50 < video_ids.length
      # 50個ずつ見に行く
      videos.fetch_and_create!(video_ids[(i * 50)...((i + 1) * 50)])
      i += 1
    end
    update!(status: 'videos_fetched')
  end
end
