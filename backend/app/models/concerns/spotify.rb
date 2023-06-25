require 'net/http'

module Spotify
  TOKEN_ENDPOINT = 'https://accounts.spotify.com/api/token'
  def self.get_token
    uri = URI.parse(TOKEN_ENDPOINT)
    data = {
      grant_type: 'client_credentials',
      client_id: ENV.fetch('SPOTIFY_CLIENT_ID'),
      client_secret: ENV.fetch('SPOTIFY_CLIENT_SECRET')
    }
    response = Net::HTTP.post_form(uri, data)
    json = JSON.parse(response.body)
    json['access_token']
  end

  SEARCH_ENDPOINT = 'https://api.spotify.com/v1/search'
  def self.get_songs_data(title, limit:1, token:nil)
    token ||= get_token
    uri = URI.parse(SEARCH_ENDPOINT)
    uri.query = URI.encode_www_form({
      q: "track:#{title}",
      limit: limit.to_s,
      type: 'track'
    })
    headers = {
      Authorization: "Bearer #{token}"
    }
    response = Net::HTTP.get_response(uri, headers)
    json = JSON.parse(response.body)
    items = json.dig('tracks', 'items')

    return items if items.present?

    # itemsが空の場合はクエリからtrack:の文字を消して再度リクエストする
    uri = URI.parse(SEARCH_ENDPOINT)
    uri.query = URI.encode_www_form({
      q: title,
      limit: limit.to_s,
      type: 'track'
    })
    response = Net::HTTP.get_response(uri, headers)
    json = JSON.parse(response.body)
    json.dig('tracks', 'items')
  end
end
