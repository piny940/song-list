namespace :channels do
  desc '過去の全ての配信を取得する'
  task create_all_videos: :environment do
    Channel.all.each(&:search_and_create_all_videos)
  end
end
