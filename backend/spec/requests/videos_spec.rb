describe Api::VideosController do
  fixtures :channels, :videos
  let(:channel) { channels(:shairu) }
  let(:video) { videos(:shairu1) }

  describe 'GET /api/videos' do
    let(:endpoint) { "/api/channels/#{channel.id}/videos" }
    it('正常に取得できる') do
      get endpoint

      expect(response.status).to eq 200

      json = response.parsed_body

      expect(json['videos'].count).to eq 2
      expect(json['videos'][0]['id']).to be_present
      expect(json['videos'][0]['video_id']).to be_present
      expect(json['videos'][0]['channel_id']).to be_present
      expect(json['videos'][0]['kind']).to be_present
      expect(json['videos'][0]['title']).to be_present
      expect(json['videos'][0]['thumbnails']['medium']['width']).to be_present
      expect(json['videos'][0]['description']).to be_present
      expect(json['videos'][0]['published_at']).to be_present
      expect(json['videos'][0]['created_at']).to be_present
      expect(json['videos'][0]['updated_at']).to be_present
      expect(json['total_pages']).to be_present
    end

    it('あいまい検索できる') do
      get endpoint, params: { query: '歌枠' }
      expect(response.status).to eq 200
      json = response.parsed_body
      expect(json['videos'].count).to eq 1
    end

    it('sinceで絞り込みができる') do
      get endpoint, params: { since: '2023-06-13 13:00:00' }
      expect(response.status).to eq 200
      json = response.parsed_body
      expect(json['videos'].count).to eq 1
    end

    it('untilで絞り込みができる') do
      get endpoint, params: { until: '2023-06-12 11:00:00' }
      expect(response.status).to eq 200
      json = response.parsed_body
      expect(json['videos'].count).to eq 1
    end
  end
  describe 'GET /api/videos/:id' do
    let(:endpoint) { "/api/channels/#{channel.id}/videos" }
    it('正常に取得できる') do
      get "#{endpoint}/#{video.id}"

      expect(response.status).to eq 200

      json = response.parsed_body

      expect(json['video']['id']).to be_present
      expect(json['video']['video_id']).to be_present
      expect(json['video']['channel_id']).to be_present
      expect(json['video']['kind']).to be_present
      expect(json['video']['title']).to be_present
      expect(json['video']['thumbnails']['medium']['width']).to be_present
      expect(json['video']['description']).to be_present
    end
  end
end
