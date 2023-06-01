class Channel < ApplicationRecord
  def self.fetch_and_create!(channel_id)
    response = Youtube.get_channel(channel_id)

    items = response.items

    return if items.blank?

    Channel.create!(
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
    response_json["snippet"]["thumbnails"]
  end

  def description
    response_json["snippet"]["description"]
  end

  def custom_id
    response_json["snippet"]["customUrl"]
  end
end
