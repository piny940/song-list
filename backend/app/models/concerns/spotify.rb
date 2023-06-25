require 'net/http'

module Spotify
  TOKEN_ENDPOINT = 'https://accounts.spotify.com/api/token'
  def self.get_token
    uri = URI(TOKEN_ENDPOINT)
    data = {
      grant_type: 'client_credentials',
      client_id: ENV.fetch('SPOTIFY_CLIENT_ID'),
      client_secret: ENV.fetch('SPOTIFY_CLIENT_SECRET')
    }
    response = Net::HTTP.post_form(uri, data)
    json = JSON.parse(response.body)
    json['access_token']
  end
end
