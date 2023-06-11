describe Api::UsersController do
  let(:endpoint) { '/api/user' }

  describe('POST /api/user') do
    it('正常にユーザーを作成できる') do
      before_count = User.count
      post endpoint, params: { user: { email: 'test1@example.com', name: 'Test1', password: 'password', password_confirmation: 'password' }}
      expect(response.status).to eq 201
      json = response.parsed_body
      expect(User.count).toe eq (before_count + 1)
      expect(json['user']['email']).to eq 'test1@example.com'
      expect(json['user']['name']).to eq 'Test1'
    end
  end
end
