class Channel < ApplicationRecord

  def self.fetch_and_create!(channel_id)
    response = Youtube.get_channel(channel_id)

    items = response.items

    return if items.blank?

    Channel.create!(
      channel_id:,
      name: items[0].snippet.title,
      response_json: response.to_json
    )
  end
end
