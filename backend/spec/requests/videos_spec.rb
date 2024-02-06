require 'rails_helper'

describe Api::VideosController do
  let(:endpoint) { '/api/videos' }

  describe 'GET /api/videos' do
    it('正常に取得できる') do
      3.times { create(:video) }
      create(:video, :video)
      get endpoint, params: { only_song_lives: '0' }

      expect(response.status).to eq 200

      json = response.parsed_body

      expect(json['videos'].count).to eq 4
      expect(json['videos'][0]['id']).to be_present
      expect(json['videos'][0]['video_id']).to be_present
      expect(json['videos'][0]['channel_id']).to be_present
      expect(json['videos'][0]['kind']).to be_present
      expect(json['videos'][0]['title']).to be_present
      expect(json['videos'][0]['thumbnails']['medium']['width']).to be_present
      expect(json['videos'][0]['description']).to be_present
      expect(Time.zone.parse(json['videos'][0]['published_at'])).to be_present
      expect(json['videos'][0]['created_at']).to be_present
      expect(json['videos'][0]['updated_at']).to be_present
      expect(json['total_pages']).to be_present
    end

    it('channelで絞り込みができる') do
      channel1 = create(:channel)
      channel2 = create(:channel)
      video1 = create(:video, channel: channel1)
      create(:video, channel: channel2)

      get endpoint, params: { channel_id: channel1.id }
      expect(response.status).to eq 200
      json = response.parsed_body
      expect(json['videos'].count).to eq 1
      expect(json['videos'][0]['id']).to eq video1.id
    end

    it('あいまい検索できる') do
      video1 = create(:video, title: 'UtaWaku')
      create(:video, title: '歌枠')

      get endpoint, params: { query: 'utAwAku' }
      expect(response.status).to eq 200
      json = response.parsed_body
      expect(json['videos'].count).to eq 1
      expect(json['videos'][0]['id']).to eq video1.id
    end

    it('sinceで絞り込みができる。ただし日付しか見ない') do
      create(:video, published_at: Time.zone.parse('2023-06-12 23:59:59'))
      video2 = create(:video, published_at: Time.zone.parse('2023-06-13 00:00:00'))

      get endpoint, params: { since: '2023-06-13 13:00:00' }
      expect(response.status).to eq 200
      json = response.parsed_body
      expect(json['videos'].count).to eq 1
      expect(json['videos'][0]['id']).to eq video2.id
    end

    it('untilで絞り込みができる。ただし日付しか見ず、untilの日付も範囲に含む') do
      video1 = create(:video, published_at: Time.zone.parse('2023-06-12 23:59:59'))
      create(:video, published_at: Time.zone.parse('2023-06-13 00:00:00'))

      get endpoint, params: { until: '2023-06-12 11:00:00' }
      expect(response.status).to eq 200
      json = response.parsed_body
      expect(json['videos'].count).to eq 1
      expect(json['videos'][0]['id']).to eq video1.id
    end

    it('歌枠(セトリが1曲以上ある配信)で絞り込みできる') do
      video1 = create(:video)
      create(:video)
      create_song('Song1', '00:12:34', 'ClariS', video1)

      get endpoint, params: { only_song_lives: '1' }
      expect(response.status).to eq 200
      json = response.parsed_body
      expect(json['videos'].count).to eq 1
      expect(json['videos'][0]['id']).to eq video1.id
    end
  end
  describe 'GET /api/videos/:id' do
    it('正常に取得できる') do
      video = create(:video)
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
