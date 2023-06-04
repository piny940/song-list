class Channel < ApplicationRecord
  has_many :videos, dependent: :destroy
  validates :channel_id, presence: true, uniqueness: true

  def self.fetch_and_create!(channel_id)
    response = Youtube.get_channel(channel_id)

    items = response.items

    return if items.blank?

    create!(
      channel_id:,
      name: items[0].snippet.title,
      response_json: items[0].to_h
    )
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
    response_json['snippet']['customUrl']
  end

  def search_and_create_recent_videos
    new_videos = []
    video_ids = Youtube.get_recent_video_ids(channel_id)
    video_ids.each do |video_id|
      next if Video.find_by(video_id:).present?

      video = videos.fetch_and_create!(video_id)
      new_videos.push(video)
    end
    new_videos
  end
end
