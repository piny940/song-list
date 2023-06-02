describe Api::VideosController do
  fixtures :channels, :videos
  let(:channel) { channels(:shairu) }
  let(:video) { videos(:one) }

  describe 'GET /api/videos' do
    let(:endpoint) { "/api/channels/#{channel.id}/videos" }
    it '正常に取得できる' do
      get endpoint

      expect(response.status).to eq 200

      json = response.parsed_body

      expect(json['videos'].count).to eq 2
      expect(json['videos'][0]['id']).to eq video.id
      expect(json['videos'][0]['video_id']).to eq video.video_id
      expect(json['videos'][0]['channel_id']).to eq channel.id
      expect(json['videos'][0]['kind']).to eq video.kind
      expect(json['videos'][0]['title']).to eq video.title
      expect(json['videos'][0]['thumbnails']['medium']['width']).to eq 320
      expect(json['videos'][0]['description']).to eq video.description
    end
  end
  describe 'GET /api/videos/:id' do
    let(:endpoint) { "/api/channels/#{channel.id}/videos" }
    it '正常に取得できる' do
      get "#{endpoint}/#{video.id}"

      expect(response.status).to eq 200

      json = response.parsed_body

      expect(json['video']['id']).to eq video.id
      expect(json['video']['video_id']).to eq video.video_id
      expect(json['video']['channel_id']).to eq channel.id
      expect(json['video']['kind']).to eq video.kind
      expect(json['video']['title']).to eq video.title
      expect(json['video']['thumbnails']['medium']['width']).to eq 320
      expect(json['video']['description']).to eq video.description
    end
  end
end
