Sidekiq.configure_server do |config|
  config.redis = {
    url: "redis://#{ENV.fetch('REDIS_HOST')}",
    password: ENV.fetch('REDIS_PASSWORD')
  }
end

Sidekiq.configure_client do |config|
  config.redis = {
    url: "redis://#{ENV.fetch('REDIS_HOST')}",
    password: ENV.fetch('REDIS_PASSWORD')
  }
end
