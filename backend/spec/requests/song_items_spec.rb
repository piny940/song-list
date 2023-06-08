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
      expect(json['song_items'].count).to eq 4
      expect(json['song_items'][0]['title']).to eq 'アイドル2'
      expect(Time.zone.parse(json['song_items'][0]['time'])).to eq Time.zone.parse('2023-06-02 00:08:16')
      expect(json['song_items'][0]['author']).to be_nil
      expect(json['song_items'][1]['author']).to eq 'YOASOBI'
    end

    it('特定のvideoのsong_itemsを取得できる') do
      get endpoint, params: { video_id: video.id }

      expect(response.status).to eq 200

      json = response.parsed_body
      expect(json['song_items'].count).to eq 2
      expect(json['song_items'][0]['title']).to eq 'アイドル2'
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
      expect(json['song_items'].count).to eq 2
    end

    it('歌手名で検索できる') do
      get endpoint, params: { query: 'YOASOBI' }
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
