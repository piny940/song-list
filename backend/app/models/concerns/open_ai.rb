require 'net/http'

module OpenAi
  extend ActiveSupport::Concern

  # 引数messagesのフォーマットは以下の通り
  # [
  #   {
  #     role: 'system' | 'assistant' | 'user',
  #     content: string
  #   }
  # ]
  COMPLETIONS_ENDPOINT = 'https://api.openai.com/v1/chat/completions'.freeze
  def self.complete_chat(messages)
    uri = URI.parse(COMPLETIONS_ENDPOINT)
    query = {
      model: 'gpt-3.5-turbo',
      messages:,
    }
    response = Net::HTTP.post(uri, query.to_json, header)
    body = response.body.to_s
    content = JSON.parse(body).dig('choices', 0, 'message', 'content')
    raise body if content.blank?

    content
  end

  def self.header
    {
      'Content-Type': 'application/json',
      'Authorization' => "Bearer #{ENV.fetch('OPENAI_API_KEY', nil)}"
    }
  end
end
