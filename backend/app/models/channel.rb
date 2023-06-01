class Channel < ApplicationRecord
  def self.fetch_and_create!(channel_id)
    response = Youtube.get_channel(channel_id)

    items = response.items

    return if items.blank?

    Channel.create!(
      channel_id:,
      name: items[0].snippet.title,
      response_json: items[0].to_json
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
    hash = JSON.parse(response_json)
    hash["snippet"]["thumbnails"]
  end

  def description
    hash = JSON.parse(response_json)
    hash["snippet"]["description"]
  end

  def custom_id
    hash["snippet"]["customUrl"]
  end
end
