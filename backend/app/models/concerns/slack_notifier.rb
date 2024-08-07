require 'net/http'

module SlackNotifier
  def self.send(message)
    # return unless Rails.env.production?

    uri = URI.parse(ENV.fetch('SLACK_WEBHOOK_URL'))
    data = {
      text: "Server: #{ENV.fetch('SERVER_NAME', '')}\n#{message}"
    }
    headers = {
      'Content-Type' => 'application/json'
    }
    Net::HTTP.post(uri, data.to_json, headers)
  end
end
