require 'rails_helper'

describe Api::SongItemsController do
  let(:endpoint) { '/api/song_items' }

  describe 'GET /api/song_items' do
    it('全てのsong_itemsを取得できる') do
      video = create(:video)
      5.times do |i|
        create_song("Song#{i}", '00:12:34', 'ClariS', video)
      end
      inactive_song = create(:song_item)
      create(:song_diff, song_item: inactive_song, title: '')
      get endpoint

      expect(response.status).to eq 200

      json = response.parsed_body

      # activeでないsong_itemは取得しない
      expect(json['song_items'].count).to eq 5
      expect(json['song_items'][0]['title']).to be_present
      expect(json['song_items'][0]['time']).to be_present
      expect(json['song_items'][0]['created_at']).to be_present
      expect(json['song_items'][0]['updated_at']).to be_present
      expect(json['total_pages']).to be_present
    end

    it('特定のvideoのsong_itemsを取得できる') do
      video1 = create(:video)
      video2 = create(:video)
      song1 = create_song('Song1', '00:12:34', 'ClariS', video1)
      create_song('Song2', '00:12:34', 'ClariS', video2)

      get endpoint, params: { video_id: video1.id }

      expect(response.status).to eq 200

      json = response.parsed_body
      expect(json['song_items'].count).to eq 1
      expect(json['song_items'][0]['id']).to eq song1.id
    end

    it('videoごとにpublished_at, timeで昇順に取得できる') do
      video1 = create(:video, published_at: Time.zone.parse('2023-06-13 00:00:00'))
      video2 = create(:video, published_at: Time.zone.parse('2023-06-12 00:00:00'))
      song1 = create_song('Song1', '00:12:34', 'ClariS', video1)
      song2 = create_song('Song2', '00:10:34', 'ClariS', video2)
      song3 = create_song('Song3', '00:09:34', 'ClariS', video1)

      get endpoint
      expect(response.status).to eq 200
      json = response.parsed_body
      expect(json['song_items'][0]['id']).to eq song3.id
      expect(json['song_items'][1]['id']).to eq song1.id
      expect(json['song_items'][2]['id']).to eq song2.id
    end

    it('特定のchannelのsong_itemsを取得できる') do
      channel1 = create(:channel)
      channel2 = create(:channel)
      video1 = create(:video, channel: channel1)
      video2 = create(:video, channel: channel2)
      song1 = create_song('Song1', '00:12:34', 'ClariS', video1)
      create_song('Song2', '00:12:34', 'ClariS', video2)
      get endpoint, params: { channel_id: channel1.id }

      expect(response.status).to eq 200
      json = response.parsed_body
      expect(json['song_items'].count).to eq 1
      expect(json['song_items'][0]['id']).to eq song1.id
    end

    it('曲名で検索できる') do
      video = create(:video)
      song1 = create_song('fooアイドルhoge', '00:12:34', 'ClariS', video)
      create_song('Song2', '00:12:34', 'ClariS', video)
      get endpoint, params: { query: 'アイドル' }

      expect(response.status).to eq 200
      json = response.parsed_body
      expect(json['song_items'].count).to eq 1
      expect(json['song_items'][0]['id']).to eq song1.id
    end

    it('歌手名で検索できる') do
      video = create(:video)
      create_song('Song1', '00:12:34', 'YOASOBI', video)
      create_song('Song2', '00:12:34', 'ClariS', video)
      create_song('Song3', '00:12:34', 'yoasobi', video)
      get endpoint, params: { query: 'YoAsobI' }

      expect(response.status).to eq 200
      json = response.parsed_body
      expect(json['song_items'].count).to eq 2
    end

    it('日付で検索できる。ただし時間は見ず、untilの日付も範囲に含む') do
      video1 = create(:video, published_at: Time.zone.parse('2023-06-12 23:59:59'))
      video2 = create(:video, published_at: Time.zone.parse('2023-06-13 00:00:00'))
      video3 = create(:video, published_at: Time.zone.parse('2023-06-14 23:59:59'))
      video4 = create(:video, published_at: Time.zone.parse('2023-06-15 00:00:00'))
      [video1, video2, video3, video4].each do |video|
        create_song('Song', '00:12:34', 'ClariS', video)
      end
      get endpoint, params: { since: '2023-06-13 13:00:00', until: '2023-06-14 11:00:00' }
      expect(response.status).to eq 200
      json = response.parsed_body
      expect(json['song_items'].count).to eq 2
    end

    it('枠名で検索できる') do
      video1 = create(:video, title: 'A Singing!')
      video2 = create(:video, title: 'Song!')
      song1 = create_song('Song1', '00:12:34', 'ClariS', video1)
      create_song('Song2', '00:12:34', 'ClariS', video2)

      get endpoint, params: { video_title: 'sing' }
      expect(response.status).to eq 200
      json = response.parsed_body
      expect(json['song_items'].count).to eq 1
      expect(json['song_items'][0]['id']).to eq song1.id
    end
  end

  describe 'GET /api/song_items/:id' do
    it('正常に取得できる') do
      video = create(:video)
      song = create_song('Song', '00:12:34', 'ClariS', video)
      get "#{endpoint}/#{song.id}"

      expect(response.status).to eq 200

      json = response.parsed_body
      expect(json['song_item']['id']).to eq song.id
    end
  end
end
