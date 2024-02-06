require 'rails_helper'

describe Api::Member::SongDiffsController do
  # fixtures :channels
  # fixtures :videos
  # fixtures :song_items
  # fixtures :users
  # fixtures :song_diffs

  before do
    @user = create(:user)
    @song_item = create(:song_item)
    @first_diff = create(:song_diff, song_item: @song_item, made_by: @user)
    @latest_diff = create(:song_diff, song_item: @song_item, made_by: @user)
    @song_item.update!(latest_diff_id: @latest_diff.id)
  end

  describe 'GET /api/member/song_items/:id/song_diffs' do
    it('song_diff一覧を正常に取得できる') do
      sign_in @user
      get "/api/member/song_items/#{@song_item.id}/song_diffs"
      expect(response.status).to eq 200
      json = response.parsed_body
      expect(json['song_diffs'].count).to eq 2
      expect(json['song_diffs'][0]['id']).to eq @latest_diff.id # 新しい順で取得
      expect(json['song_diffs'][0]['made_by']['name']).to eq @user.name
      expect(json['total_pages']).to be 1
    end

    it('ページングが正しく行われる') do
      sign_in @user
      get "/api/member/song_items/#{@song_item.id}/song_diffs", params: { count: 1 }
      expect(response.status).to eq 200
      json = response.parsed_body
      expect(json['song_diffs'].count).to eq 1
      expect(json['next_song_diff']['id']).to eq @first_diff.id
      expect(json['total_pages']).to be 2
    end

    it('ログインしていない状態ではエラーになる') do
      get "/api/member/song_items/#{@song_item.id}/song_diffs"
      expect(response.status).to eq 400
      json = response.parsed_body
      expect(json['song_diffs']).to be_nil
    end
  end

  describe 'POST /api/member/song_items/:id/song_diffs' do
    it('song_diffを正常に作成できる') do
      sign_in @user
      before_count = @song_item.song_diffs.count
      post "/api/member/song_items/#{@song_item.id}/song_diffs", params: { song_diff: { time: '00:12:34', title: 'コネクト', author: 'ClariS' } }
      expect(response.status).to eq 201
      expect(@song_item.song_diffs.count).to eq before_count + 1
      json = response.parsed_body
      expect(json['song_diff']['title']).to eq 'コネクト'
      expect(json['song_diff']['author']).to eq 'ClariS'
      expect(json['song_diff']['made_by']['id']).to eq @user.id
    end

    it('ログインしてない状態ではエラーになる') do
      before_count = @song_item.song_diffs.count
      post "/api/member/song_items/#{@song_item.id}/song_diffs", params: { song_diff: { time: '00:12:34', title: 'コネクト', author: 'ClariS' } }
      expect(response.status).to eq 400
      json = response.parsed_body
      expect(json['song_diffs']).to be_nil
      expect(@song_item.song_diffs.count).to eq before_count
    end
  end
end
