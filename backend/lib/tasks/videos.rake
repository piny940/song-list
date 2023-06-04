namespace :videos do
  desc '直近の動画のセトリから曲を取得する'
  task create_recent_videos_song_items: :environment do
    Channel.all.each do |channel|
      channel.search_and_create_recent_videos
    end
    Video.where.not(status: 'completed').search_and_create_song_items!
  end
end
