require 'rails_helper'

describe 'Channels', type: :request do
  describe 'GET /api/channels' do
    it('正常に取得できる') do
      get '/api/channels'

      expect(response.status).to eq(200)

      json = JSON.parse(response.body)

      expect(json["channels"].count).to eq 1
      expect(json["channels"][0]["medium"]["width"]).to eq 200
    end
  end
end
