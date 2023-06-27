class HomesController < ApplicationController
  def show
    p 'hoge'
    p ENV['GOOGLE_BUCKET']
    p ENV['USER']
    p ENV['GOOGLE_API_KEY']
    p ENV.fetch('GOOGLE_API_KEY')
  end
end
