require 'net/http'

module Spotify
  TOKEN_ENDPOINT = 'https://accounts.spotify.com/api/token'.freeze
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

  SEARCH_ENDPOINT = 'https://api.spotify.com/v1/search'.freeze
  def self.get_songs_data(title, token: nil)
    token ||= get_token
    headers = {
      Authorization: "Bearer #{token}"
    }

    # クエリにtrack:を含む場合と含まない場合それぞれで
    uri = URI.parse(SEARCH_ENDPOINT)
    uri.query = URI.encode_www_form({
                                      q: "track:#{title}",
                                      limit: '1',
                                      type: 'track',
                                      market: 'JP'
                                    })
    response = Net::HTTP.get_response(uri, headers)
    json = JSON.parse(response.body)
    item1 = json.dig('tracks', 'items')&.first

    uri = URI.parse(SEARCH_ENDPOINT)
    uri.query = URI.encode_www_form({
                                      q: title,
                                      limit: '1',
                                      type: 'track',
                                      market: 'JP'
                                    })
    response = Net::HTTP.get_response(uri, headers)
    json = JSON.parse(response.body)
    item2 = json.dig('tracks', 'items')&.first

    item2&.dig('popularity')&.< item1&.dig('popularity') ? item1 : item2
  end
end
