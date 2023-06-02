describe Api::Video::SongItemsController do
  let(:video) { videos(:one) }
  let(:endpoint) { "api/song_items" }

  describe 'GET /api/song_items' do
    it('全てのsong_itemsを取得できる') do
      get endpoint

      expect(response.status).to eq 200

      json = response.parsed_body

      # activeでないsong_itemは取得しない
      expect(json["song_items"].count).to eq 3
      expect(json["song_items"][0]["title"]).to eq 'アイドル2'
      expect(json["song_items"][0]["time"]).to eq Time.zone.parse('2023-06-02T00:08:16')
      expect(json["song_items"][0]["author"]).to be_nil
      expect(json["song_items"][1]["author"]).to 'YOASOBI'
    end

    it('特定のvideoのsong_itemsを取得できる') do
      get endpoint, video_id: video.id

      expect(response.status).to eq 200

      json = response.parsed_body
      expect(json["song_items"].count).to eq 2
      expect(json["song_items"][0]["title"]).to eq 'アイドル2'
    end
  end
end
