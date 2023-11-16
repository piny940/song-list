SHAIRU_VIDEO_COUNT = 4
MASHIRO_VIDEO_COUNT = 5

describe Api::VideosController do
  let(:last_video) { Video.last }

  before do
    shairu = create(:channel, name: 'しゃいる')
    mashiro = create(:channel, name: 'ましろ')

    video_num = 1
    (SHAIRU_VIDEO_COUNT-1).times do
      create(:video, channel: shairu, published_at: "2023-06-#{video_num} 12:00:00")
      video_num += 1
    end
    (MASHIRO_VIDEO_COUNT-1).times do
      create(:video, channel: mashiro, published_at: "2023-06-#{video_num} 12:00:00")
      video_num += 1
    end
    create(:video, channel: shairu, title: 'ましろの歌枠！', published_at: "2023-06-#{video_num} 12:00:00")
    video_num += 1
    create(:video, channel: mashiro, title: 'しゃいるの歌枠！', published_at: "2023-06-#{video_num} 12:00:00")
  end

  describe 'GET /api/videos' do
    it('正常に取得できる') do
      get endpoint, params: { only_song_lives: '0' }

      expect(response.status).to eq 200

      json = response.parsed_body

      expect(json['videos'].count).to eq SHAIRU_VIDEO_COUNT + MASHIRO_VIDEO_COUNT
      expect(json['videos'][0]['id']).to eq last_video.id
      expect(json['videos'][0]['video_id']).to eq last_video.video_id
      expect(json['videos'][0]['channel_id']).to eq last_video.channel_id
      expect(json['videos'][0]['kind']).to eq last_video.kind
      expect(json['videos'][0]['title']).to eq last_video.title
      expect(json['videos'][0]['thumbnails']['medium']['width']).to be_present
      expect(json['videos'][0]['description']).to eq last_video.description
      expect(Time.zone.parse(json['videos'][0]['published_at'])).to eq last_video.published_at
      expect(json['videos'][0]['created_at']).to be_present
      expect(json['videos'][0]['updated_at']).to be_present
      expect(json['total_pages']).to be_present
    end

    it('channelで絞り込みができる') do
      get endpoint, params: { channel_id: shairu.id }
      expect(response.status).to eq 200
      json = response.parsed_body
      expect(json['videos'].count).to eq SHAIRU_VIDEO_COUNT
    end

    it('あいまい検索できる') do
      get endpoint, params: { query: '歌枠' }
      expect(response.status).to eq 200
      json = response.parsed_body
      expect(json['videos'].count).to eq 2
    end

    it('sinceで絞り込みができる') do
      get endpoint, params: { since: '2023-06-13 13:00:00' }
      expect(response.status).to eq 200
      json = response.parsed_body
      expect(json['videos'].count).to eq 3
    end

    it('untilで絞り込みができる') do
      get endpoint, params: { until: '2023-06-12 11:00:00' }
      expect(response.status).to eq 200
      json = response.parsed_body
      expect(json['videos'].count).to eq 1
    end

    it('セトリが1曲以上あるVideoに絞り込みができる') do
      get endpoint, params: { only_song_lives: '1' }
      expect(response.status).to eq 200
      json = response.parsed_body
      expect(json['videos'].count).to eq 4
    end
  end
  describe 'GET /api/videos/:id' do
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
