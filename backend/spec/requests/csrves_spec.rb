describe Api::CsrvesController do
  describe 'GET /api/csrf' do
    it('正常に取得できる') do
      get api_csrf_path
      expect(response.status).to eq(200)
      json = JSON.parse(response.body)
      expect(json['token']).to be_present
    end
  end
end
