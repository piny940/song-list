namespace :channels do
  desc '過去の全ての配信を取得する'
  task create_all_videos: :environment do
    Channel.status_ready.each(&:search_and_create_all_videos)
  end

  desc 'アイコンなどの情報を最新にする'
  task refetch: :environment do
    Channel.fetch_and_create! Channel.pluck(:channel_id)
  end
end
