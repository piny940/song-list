require 'rails_helper'

describe Api::ChannelsController, type: :request do
  before do
    @channel = create(:channel)
    create(:channel)
    create(:channel, :hidden)
  end

  describe 'GET /api/channels' do
    it('正常に取得できる') do
      get '/api/channels'

      expect(response.status).to eq(200)

      json = response.parsed_body
      # publishedなチャンネルのみ取得する
      expect(json['channels'].count).to eq 2
      expect(json['channels'][0]['thumbnails']['medium']['width']).to eq 240
      expect(json['channels'][0]['created_at']).to be_present
      expect(json['channels'][0]['updated_at']).to be_present
      expect(json['channels'][0]['custom_name']).to be_present
    end
  end
  describe 'GET /api/channels/:id' do
    it('正常に取得できる') do
      get "/api/channels/#{@channel.id}"

      expect(response.status).to eq(200)

      json = response.parsed_body
      expect(json['channel']['id']).to eq @channel.id
    end
  end
end
