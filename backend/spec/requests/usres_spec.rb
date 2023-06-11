describe Api::UsersController do
  let(:endpoint) { '/api/user' }

  describe('POST /api/user') do
    it('正常にユーザーを作成できる') do
      before_count = User.count
      post endpoint, params: { user: { email: 'alice@example.com', name: 'Alice', password: 'password', password_confirmation: 'password' }}
      expect(response.status).to eq 201
      json = response.parsed_body
      expect(User.count).to eq (before_count + 1)
      expect(json['user']['email']).to eq 'alice@example.com'
      expect(json['user']['name']).to eq 'Alice'
    end
  end
end
