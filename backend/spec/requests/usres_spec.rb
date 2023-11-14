describe Api::UsersController do
  let(:endpoint) { '/api/user' }

  describe('GET /api/user') do
    it('ログイン中のユーザーを取得できる') do
      user = create(:user, name: 'Alice')
      sign_in user
      get endpoint
      expect(response.status).to eq 200
      json = response.parsed_body
      expect(json['user']['name']).to eq 'Alice'
    end

    it('ログインしていないときはuserはnilで返ってくる') do
      get endpoint
      expect(response.status).to eq 200
      json = response.parsed_body
      expect(json['user']).to be_nil
    end
  end

  describe('POST /api/user') do
    it('正常にユーザーを作成してログインできる') do
      before_count = User.count
      post endpoint, params: { user: { name: 'Alice', password: 'password', password_confirmation: 'password' } }
      expect(response.status).to eq 201
      json = response.parsed_body
      expect(User.count).to eq(before_count + 1)
      expect(json['user']['name']).to eq 'Alice'

      get endpoint
      expect(response.status).to eq 200
      json = response.parsed_body
      expect(json['user']['name']).to eq 'Alice'
    end

    it('ユーザー名が同じユーザーは複数作れない') do
      User.create!(name: 'Alice', password: 'password', password_confirmation: 'password')
      before_count = User.count
      post endpoint, params: { user: { name: 'Alice', password: 'password', password_confirmation: 'password' } }
      expect(response.status).to eq 400
      json = response.parsed_body
      expect(User.count).to eq(before_count)
      expect(json['message']).to eq 'ユーザー名が同じユーザーが既に存在します'

      get endpoint
      expect(response.status).to eq 200
      json = response.parsed_body
      expect(json['user']).to be_nil
    end

    it('名前は空欄ではいけない') do
      before_count = User.count
      post endpoint, params: { user: { name: '', password: 'password', password_confirmation: 'password' } }
      expect(response.status).to eq 400
      json = response.parsed_body
      expect(User.count).to eq(before_count)
      expect(json['message']).to eq 'ユーザー名を入力してください'

      get endpoint
      expect(response.status).to eq 200
      json = response.parsed_body
      expect(json['user']).to be_nil
    end

    it('passwordは空欄ではいけない') do
      before_count = User.count
      post endpoint, params: { user: { name: 'アリス', password: '', password_confirmation: '' } }
      expect(response.status).to eq 400
      json = response.parsed_body
      expect(User.count).to eq(before_count)
      expect(json['message']).to eq 'パスワードを入力してください'

      get endpoint
      expect(response.status).to eq 200
      json = response.parsed_body
      expect(json['user']).to be_nil
    end

    it('passwordは6字以上で無いといけないいけない') do
      before_count = User.count
      post endpoint, params: { user: { name: 'アリス', password: 'pass', password_confirmation: 'pass' } }
      expect(response.status).to eq 400
      json = response.parsed_body
      expect(User.count).to eq(before_count)
      expect(json['message']).to eq 'パスワードは6文字以上で入力してください'

      get endpoint
      expect(response.status).to eq 200
      json = response.parsed_body
      expect(json['user']).to be_nil
    end

    it('passwordとpassword_confirmationは同じではいけない') do
      before_count = User.count
      post endpoint, params: { user: { name: 'アリス', password: 'password', password_confirmation: 'pass' } }
      expect(response.status).to eq 400
      json = response.parsed_body
      expect(User.count).to eq(before_count)
      expect(json['message']).to eq 'パスワード（確認用）とパスワードの入力が一致しません'

      get endpoint
      expect(response.status).to eq 200
      json = response.parsed_body
      expect(json['user']).to be_nil
    end
  end
end
