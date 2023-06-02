describe Api::VideosController do
  fixtures :channels, :videos
  let(:channel) { channels(:one) }
  let(:video) { videos(:one) }

  describe 'GET /api/videos' do
    let(:endpoint) { "/api/channels/#{channel.id}/videos" }
    it '正常に取得できる' do
      get endpoint

      expect(response.status).to eq 200

      json = response.parsed_body

      expect(json['videos'].count).to eq 1
      expect(json['videos'][0]['id']).to eq video.id
      expect(json['videos'][0]['video_id']).to eq video.video_id
      expect(json['videos'][0]['channel_id']).to eq channel.id
      expect(json['videos'][0]['kind']).to eq video.kind
      expect(json['videos'][0]['title']).to eq video.title
      expect(json['videos'][0]['thumbnails']['medium']['width']).to eq 320
      expect(json['videos'][0]['description']).to eq video.description
    end
  end
end
