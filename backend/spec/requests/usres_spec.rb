describe Api::UsersController do
  let(:endpoint) { '/api/user' }

  describe('POST /api/user') do
    it('正常にユーザーを作成できる') do
      before_count = User.count
      post endpoint, params: { user: { email: 'alice@example.com', name: 'Alice', password: 'password', password_confirmation: 'password' } }
      expect(response.status).to eq 201
      json = response.parsed_body
      expect(User.count).to eq(before_count + 1)
      expect(json['user']['email']).to eq 'alice@example.com'
      expect(json['user']['name']).to eq 'Alice'
    end

    it('メールアドレスが同じユーザーは複数作れない') do
      User.create!(email: 'alice@example.com', name: 'Alice', password: 'password', password_confirmation: 'password')
      before_count = User.count
      post endpoint, params: { user: { email: 'alice@example.com', name: 'アリス', password: 'password', password_confirmation: 'password' } }
      expect(response.status).to eq 400
      json = response.parsed_body
      expect(User.count).to eq(before_count)
      expect(json['message']).to eq 'メールアドレスはすでに存在します'
    end

    it('メールアドレスは空欄ではいけない') do
      before_count = User.count
      post endpoint, params: { user: { email: '', name: 'アリス', password: 'password', password_confirmation: 'password' } }
      expect(response.status).to eq 400
      json = response.parsed_body
      expect(User.count).to eq(before_count)
      expect(json['message']).to eq 'メールアドレスを入力してください'
    end

    it('名前は空欄ではいけない') do
      before_count = User.count
      post endpoint, params: { user: { email: 'alice@example.com', name: '', password: 'password', password_confirmation: 'password' } }
      expect(response.status).to eq 400
      json = response.parsed_body
      expect(User.count).to eq(before_count)
      expect(json['message']).to eq '名前を入力してください'
    end

    it('passwordは空欄ではいけない') do
      before_count = User.count
      post endpoint, params: { user: { email: 'alice@example.com', name: 'アリス', password: '', password_confirmation: '' } }
      expect(response.status).to eq 400
      json = response.parsed_body
      expect(User.count).to eq(before_count)
      expect(json['message']).to eq 'パスワードを入力してください'
    end

    it('passwordは6字以上で無いといけないいけない') do
      before_count = User.count
      post endpoint, params: { user: { email: 'alice@example.com', name: 'アリス', password: 'pass', password_confirmation: 'pass' } }
      expect(response.status).to eq 400
      json = response.parsed_body
      expect(User.count).to eq(before_count)
      expect(json['message']).to eq 'パスワードは6文字以上で入力してください'
    end

    it('passwordとpassword_confirmationは同じではいけない') do
      before_count = User.count
      post endpoint, params: { user: { email: 'alice@example.com', name: 'アリス', password: 'password', password_confirmation: 'pass' } }
      expect(response.status).to eq 400
      json = response.parsed_body
      expect(User.count).to eq(before_count)
      expect(json['message']).to eq 'パスワード（確認用）とパスワードの入力が一致しません'
    end
  end
end
