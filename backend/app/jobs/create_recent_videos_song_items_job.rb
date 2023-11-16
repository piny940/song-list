class CreateRecentVideosSongItemsJob < ApplicationJob
  queue_as :default

  def perform(*_args)
    Rails.logger.info 'Start searching recent videos'
    Channel.all.find_each(&:search_and_create_recent_videos)
    Rails.logger.info 'Start searching setlist'
    Video.search_and_create_song_items!
    Rails.logger.info 'Completed searching setlist'
  end
end
