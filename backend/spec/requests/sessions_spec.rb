describe Api::SessionsController do
  let(:endpoint) { '/api/session' }
  let(:user_endpoint) { '/api/user' }
  let(:user) { User.last }

  before do
    User.create!(email: 'alice@example.com', name: 'Alice', password: 'password', password_confirmation: 'password')
  end

  describe('POST /api/session') do
    it('正常にログインできる') do
      post endpoint, params: { email: user.email, password: 'password' }
      expect(response.status).to eq 200
      json = response.parsed_body
      expect(json['user']['email']).to eq user.email
      expect(json['user']['name']).to eq user.name
      expect(json['message']).to eq 'ログインしました'

      get user_endpoint
      expect(response.status).to eq 200
      json = response.parsed_body
      expect(json['user']['email']).to eq 'alice@example.com'
    end

    it('パスワードが違う場合はログインできない') do
      post endpoint, params: { email: user.email, password: 'Password' }
      expect(response.status).to eq 400
      json = response.parsed_body
      expect(json['user']).to be_nil
      expect(json['message']).to eq 'メールアドレスまたはパスワードが違います'

      get user_endpoint
      expect(response.status).to eq 200
      json = response.parsed_body
      expect(json['user']).to be_nil
    end

    it('メールアドレスが違う場合はログインできない') do
      post endpoint, params: { email: 'Alice@example.com', password: 'password' }
      expect(response.status).to eq 400
      json = response.parsed_body
      expect(json['user']).to be_nil
      expect(json['message']).to eq 'メールアドレスまたはパスワードが違います'

      get user_endpoint
      expect(response.status).to eq 200
      json = response.parsed_body
      expect(json['user']).to be_nil
    end
  end

  describe('DELETE /api/session') do
    it('正常にログアウトできる') do
      sign_in user

      delete endpoint
      expect(response.status).to eq 200
      json = response.parsed_body
      expect(json['message']).to eq 'ログアウトしました'

      get user_endpoint
      expect(response.status).to eq 200
      json = response.parsed_body
      expect(json['user']).to be_nil
    end
  end
end
