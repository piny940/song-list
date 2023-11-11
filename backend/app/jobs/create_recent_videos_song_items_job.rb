class CreateRecentVideosSongItemsJob < ApplicationJob
  queue_as :default

  def perform(*args)
    p 'hoge'
  end
end
