require 'exception_notification/rails'

if Rails.env.production?
  ExceptionNotification.configure do |config|
    config.add_notifier :slack, {
      username: 'エラー通知太郎',
      icon_emoji: ':japanese_ogre:',
      webhook_url: ENV.fetch('SLACK_WEBHOOK_URL', nil),
    }
  end
end
