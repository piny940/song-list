describe Api::SongItemsController do
  fixtures :channels
  fixtures :videos
  fixtures :song_items
  fixtures :users
  fixtures :song_diffs

  let(:channel) { channels(:shairu) }
  let(:video) { videos(:shairu1) }
  let(:endpoint) { '/api/song_items' }

  describe 'GET /api/song_items' do
    it('全てのsong_itemsを取得できる') do
      get endpoint

      expect(response.status).to eq 200

      json = response.parsed_body

      # activeでないsong_itemは取得しない
      expect(json['song_items'].count).to eq 5
      expect(json['song_items'][0]['title']).to eq 'ウンディーネ'
      expect(json['song_items'][0]['time']).to eq '00:09:10'
      expect(json['song_items'][0]['author']).to be_nil
      expect(json['song_items'][1]['author']).to eq '木村弓'
      expect(json['song_items'][0]['created_at']).to be_present
      expect(json['song_items'][0]['updated_at']).to be_present
      expect(json['total_pages']).to be_present
    end

    it('特定のvideoのsong_itemsを取得できる') do
      get endpoint, params: { video_id: video.id }

      expect(response.status).to eq 200

      json = response.parsed_body
      expect(json['song_items'].count).to eq 2
      expect(json['song_items'][0]['title']).to eq 'あいどる3'
    end

    it('特定のchannelのsong_itemsを取得できる') do
      get endpoint, params: { channel_id: channel.id }

      expect(response.status).to eq 200
      json = response.parsed_body
      expect(json['song_items'].count).to eq 3
    end

    it('曲名で検索できる') do
      get endpoint, params: { query: 'アイドル' }
      expect(response.status).to eq 200
      json = response.parsed_body
      expect(json['song_items'].count).to eq 1
    end

    it('歌手名で検索できる') do
      get endpoint, params: { query: 'YOASOBI' }
      expect(response.status).to eq 200
      json = response.parsed_body
      expect(json['song_items'].count).to eq 2
    end

    it('日付で検索できる') do
      get endpoint, params: { since: '2023-06-13 13:00:00', until: '2023-06-14 11:00:00' }
      expect(response.status).to eq 200
      json = response.parsed_body
      expect(json['song_items'].count).to eq 2
    end

    it('枠名で検索できる') do
      get endpoint, params: { video_title: 'sing' }
      expect(response.status).to eq 200
      json = response.parsed_body
      expect(json['song_items'].count).to eq 2
    end
  end

  describe 'GET /api/song_items/:id' do
    it('正常に取得できる') do
      song_item = song_items(:one)
      get "#{endpoint}/#{song_item.id}"

      expect(response.status).to eq 200

      json = response.parsed_body
      expect(json['song_item']['title']).to eq 'アイドル2'
    end
  end
end
