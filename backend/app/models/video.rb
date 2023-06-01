class Video < ApplicationRecord
  belongs_to :channel

  enum kind: {
    video: 0,
    live: 10,
    short: 20
  }, _prefix: true

  def self.fetch_and_create!(video_id)
    response = Youtube.get_video(video_id)
    items = response.items

    return if items.blank?

    kind = items[0].live_streaming_details.present? ? 'live' : 'video'

    create!(
      video_id:,
      title: items[0].snippet.title,
      response_json: items[0].to_h,
      kind:
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
end
