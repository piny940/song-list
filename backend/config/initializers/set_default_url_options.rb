Rails.application.routes.default_url_options[:host] ||= ENV.fetch('RAILS_HOST', nil)
if Rails.application.config.force_ssl || Rails.env.development?
  Rails.application.routes.default_url_options[:protocol] =
    'https'
end
