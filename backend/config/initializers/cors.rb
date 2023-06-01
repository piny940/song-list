Rails.application.config.middleware.insert_before 0, Rack::Cors do
  allow do
    origins [
      'http://localhost:3001' # frontend host
    ]
    resource '*',
             methods: %i[get post put patch delete options head],
             headers: :any,
             credentials: true
  end
end
