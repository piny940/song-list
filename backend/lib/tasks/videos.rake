namespace :videos do
  desc '直近の動画のセトリから曲を取得する'
  task create_recent_videos_song_items: :environment do
    p 'Start searching recent videos'
    Channel.all.each(&:search_and_create_recent_videos)
    p 'Start searching setlist'
    Video.search_and_create_song_items!
    p 'Completed searching setlist'
  end

  desc '過去の歌情報からauthorカラムを埋める'
  task update_songs_author_from_history: :environment do
    Video.update_songs_author_from_history!
  end
end
