require 'net/http'

module SlackNotifier
  def self.send(message)
    # return unless Rails.env.production?

    uri = URI.parse(ENV.fetch('SLACK_WEBHOOK_URL'))
    data = {
      text: message
    }
    headers = {
      'Content-Type' => 'application/json'
    }
    resopnse = Net::HTTP.post(uri, data.to_json, headers)
  end
end
