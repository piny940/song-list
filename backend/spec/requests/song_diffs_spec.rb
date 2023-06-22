describe Api::Member::SongDiffsController do
  fixtures :channels
  fixtures :videos
  fixtures :song_items
  fixtures :users
  fixtures :song_diffs

  let(:song_item) { song_items(:one) }
  let(:first_diff) { song_diffs(:one1) }
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
      expect(json['song_diffs'][0]['made_by']['email']).to eq 'test1@example.com'
      expect(json['total_pages']).to be_present
    end

    it('ページングが正しく行われる') do
      sign_in user
      get "/api/member/song_items/#{song_item.id}/song_diffs", params: { count: 1 }
      expect(response.status).to eq 200
      json = response.parsed_body
      expect(json['song_diffs'].count).to eq 1
      expect(json['next_song_diff']['id']).to eq first_diff.id
    end

    it('ログインしていない状態ではエラーになる') do
      get "/api/member/song_items/#{song_item.id}/song_diffs"
      expect(response.status).to eq 400
      json = response.parsed_body
      expect(json['song_diffs']).to be_nil
    end
  end

  describe 'POST /api/member/song_items/:id/song_diffs' do
    it('song_diffを正常に作成できる') do
      sign_in user
      before_count = song_item.song_diffs.count
      post "/api/member/song_items/#{song_item.id}/song_diffs", params: { song_diff: { time: '00:12:34', title: 'コネクト', author: 'ClariS' } }
      expect(response.status).to eq 201
      expect(song_item.song_diffs.count).to eq before_count + 1
      json = response.parsed_body
      expect(json['song_diff']['title']).to eq 'コネクト'
      expect(json['song_diff']['author']).to eq 'ClariS'
      expect(json['song_diff']['made_by']['id']).to eq user.id
    end

    it('ログインしてない状態ではエラーになる') do
      song_item.song_diffs.count
      post "/api/member/song_items/#{song_item.id}/song_diffs", params: { song_diff: { time: '00:12:34', title: 'コネクト', author: 'ClariS' } }
      expect(response.status).to eq 400
      json = response.parsed_body
      expect(json['song_diffs']).to be_nil
    end
  end
end
