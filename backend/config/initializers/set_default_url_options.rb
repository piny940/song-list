Rails.application.routes.default_url_options[:host] ||= ENV.fetch('RAILS_HOST', nil)
Rails.application.routes.default_url_options[:protocol] = 'https'
