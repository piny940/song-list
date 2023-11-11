class CreateRecentVideosSongItemsJob < ApplicationJob
  queue_as :default

  def perform(*args)
    p 'Start searching recent videos'
    Channel.all.each(&:search_and_create_recent_videos)
    p 'Start searching setlist'
    Video.search_and_create_song_items!
    p 'Completed searching setlist'
  end
end
