namespace :videos do
  desc '直近の動画のセトリから曲を取得する'
  task create_recent_videos_song_items: :environment do
    p 'Start searching recent videos'
    Channel.all.find_each(&:search_and_create_recent_videos)
    p 'Start searching setlist'
    Video.search_and_create_song_items!
    p 'Completed searching setlist'
  end

  desc '全ての動画のセトリを作成する'
  task create_all_setlists: :environment do
    Video.search_and_create_song_items!
    p 'Completed searching setlist'
    Video.update_songs_author_from_history!
    p 'Completed updating from history'
    Video.update_songs_author_from_spotify!
  end

  desc '過去の歌情報からauthorカラムを埋める'
  task update_songs_author_from_history: :environment do
    Video.update_songs_author_from_history!
  end

  desc 'Spotifyからauthorカラムを埋める'
  task update_songs_author_from_spotify: :environment do
    Video.update_songs_author_from_spotify!
  end
end
