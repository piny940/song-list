describe Api::SessionsController do
  let(:endpoint) { '/api/session' }
  let(:user) { User.last }

  before do
    User.create!(email: 'alice@example.com', name: 'Alice', password: 'password', password_confirmation: 'password')
  end

  describe('POST /api/session') do
    it('正常にログインできる') do
      post endpoint, params: { email: user.email, password: user.password }
      expect(response.status).to eq 200
      json = response.parsed_body
      expect(json['user']['email']).to eq user.email
      expect(json['user']['name']).to eq user.name
      expect(json['message']).to eq 'ログインしました'
    end
  end
end
