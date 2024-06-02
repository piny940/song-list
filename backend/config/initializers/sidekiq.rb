Sidekiq.configure_server do |config|
  config.redis = {
    url: "redis://#{ENV.fetch('REDIS_HOST', nil)}",
    password: ENV.fetch('REDIS_PASSWORD', nil)
  }
end

Sidekiq.configure_client do |config|
  config.redis = {
    url: "redis://#{ENV.fetch('REDIS_HOST', nil)}",
    password: ENV.fetch('REDIS_PASSWORD', nil)
  }
end
