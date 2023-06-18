describe Api::Member::SongDiffsController do
  fixtures :channels
  fixtures :videos
  fixtures :song_items
  fixtures :users
  fixtures :song_diffs

  let(:song_item) { song_items(:one) }
  let(:latest_diff) { song_diffs(:one2) }
  let(:user) { users(:one) }

  describe 'GET /api/member/song_items/:id/song_diffs' do
    it('song_diff一覧を正常に取得できる') do
      sign_in user
      get "/api/member/song_items/#{song_item.id}/song_diffs"
      expect(response.status).to eq 200
      json = response.parsed_body
      expect(json['song_diffs'].count).to eq 2
      expect(json['song_diffs'][0]['id']).to eq latest_diff.id # 新しい順で取得
    end

    it('ログインしていない状態ではエラーになる') do
      get "/api/member/song_items/#{song_item.id}/song_diffs"
      expect(response.status).to eq 400
      json = response.parsed_body
      expect(json['song_diffs']).to be_nil
    end
  end

  describe 'POST /api/member/song_items/:id/song_diffs' do

  end
end
