# config valid for current version and patch releases of Capistrano
lock '~> 3.17.3'

set :application, 'backend_song_list'
set :repo_url, 'git@github.com:piny940/song-list.git'
set :branch, 'main'
set :subdir, "backend"

# sharedディレクトリに入れるファイルを指定
append :linked_dirs, 'log', 'tmp/pids', 'tmp/cache', 'tmp/sockets', 'vendor/bundle', 'public/system', 'public/uploads'

# secrets.ymlをsharedに入れる設定
set :linked_files, fetch(:linked_files, []).push('config/secrets.yml')

# SSH接続設定
set :ssh_options, {
  auth_methods: ['publickey'],
  keys: ['~/.ssh/kagoya'],
  verify_host_key: :never
}

# 保存しておく世代の設定
set :keep_releases, 5

# rbenvの設定
set :rbenv_type, :user
set :rbenv_ruby, '3.1.2'
set :optional_env_vars, %w[BACKEND_SONG_LIST_DATABASE_PASSWORD BUNDLE_GEMFILE REDIS_URL RAILS_MAX_THREADS TEST_PG_USER TEST_PG_PASSWORD TEST_PG_HOST MY_APP_DATABASE_URL RAILS_MASTER_KEY RAILS_SERVE_STATIC_FILES RAILS_LOG_TO_STDOUT CI GOOGLE_APPLICATION_CREDENTIALS RAILS_MIN_THREADS RAILS_ENV PORT PIDFILE WEB_CONCURRENCY]

# Postgresql
set :pg_without_sudo, false
set :pg_host, 'db.piny940.com'
set :pg_database, 'backend_song_list_production'
set :pg_username, 'ansai'
# set :pg_generate_random_password, true
# set :pg_ask_for_password, true
set :pg_generate_random_password, true
set :pg_extensions, %w[citext hstore]
set :pg_encoding, 'UTF-8'
set :pg_pool, '100'

# Dotenv
invoke 'dotenv:read'
invoke 'dotenv:check'
invoke 'dotenv:setup'

# ここからUnicornの設定
# Unicornのプロセスの指定
set :unicorn_pid, -> { "#{shared_path}/tmp/pids/unicorn.pid" }

# Unicornの設定ファイルの指定
set :unicorn_config_path, -> { "#{current_path}/config/unicorn.rb" }

# Unicornを再起動するための記述
after 'deploy:publishing', 'deploy:restart'
namespace :deploy do
  task :restart do
    invoke 'unicorn:restart'
  end
end

# ワーキングディレクトリをbackendに移す
after "deploy:update_code", "deploy:checkout_subdir"
namespace :deploy do
    desc "Checkout subdirectory and delete all the other stuff"
    task :checkout_subdir do
        run "mv #{current_release}/#{subdir}/ /tmp && rm -rf #{current_release}/* && mv /tmp/#{subdir}/* #{current_release}"
    end
end
