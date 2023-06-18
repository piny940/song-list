require 'capistrano/setup'
require 'capistrano/deploy'
require 'capistrano/rbenv'
require 'capistrano/bundler'
require 'capistrano/rails/assets'
require 'capistrano/rails/migrations'
require 'capistrano3/unicorn'
require 'capistrano/scm/git'
require 'capistrano/postgresql'
install_plugin Capistrano::SCM::Git
Dir.glob('lib/capistrano/tasks/*.rake').each { |r| import r }
