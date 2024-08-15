module SongLive
  extend ActiveSupport::Concern

  module ClassMethods
    def song_lives
      where('title LIKE ?', '%歌枠%').or(where('title LIKE ?', '%弾き語り%')).or(where('title ILIKE ?', '%Karaoke%'))
    end

    def search_and_create_song_items!
      videos = where(status: %w[ready fetched]).order(published_at: :desc).all

      videos.each(&:search_and_create_song_items!)
    end

    def update_songs_author_from_history!
      where(status: %w[song_items_created fetched_history spotify_fetched spotify_completed])
        .each(&:update_songs_author_from_history!)
    end

    def update_songs_author_from_spotify!
      token = Spotify.get_token
      where(status: %w[song_items_created fetched_history spotify_fetched]).each do |video|
        video.update_songs_author_from_spotify!(token)
      end
    end
  end

  def song_live?
    !!title.match(/歌枠|弾き語り|(K|k)(A|a)(R|r)(A|a)(O|o)(K|k)(E|e)/)
  end

  def search_and_create_song_items!
    # 歌枠でない場合はstatusをcompleteにして終了
    unless song_live?
      update!(status: 'completed')
      return []
    end

    # 一旦セトリ・コメントをすべて削除して1から確認する
    song_items.find_each(&:destroy)
    comments.find_each(&:destroy)

    update!(status: 'fetched')

    create_comments_song_items!
  end

  def create_comments_song_items!
    page_token = nil
    loop do
      begin
        response = Youtube.get_video_comments(video_id, page_token:)
      rescue Google::Apis::ClientError
        return []
      end
      return [] if response.items.nil?

      new_comments = comments.create_from_youtube!(response.items)
      new_comments.each do |comment|
        song_items = comment.create_song_items!

        # SongItemsが見つかり次第終了
        next if song_items.blank?

        if song_items_completed?
          update!(status: 'completed')
        else
          update!(status: 'song_items_created')
        end
        return song_items
      end

      page_token = response.next_page_token
      return [] if page_token.blank?
    end
  end

  def update_songs_author_from_history!
    update!(status: 'fetched_history')
    song_items.each(&:update_author_from_histroy!)
    update!(status: 'completed') if song_items.completed.count == song_items.count
  end

  def update_songs_author_from_spotify!(spotify_token = nil)
    spotify_token ||= Spotify.get_token
    update!(status: 'spotify_fetched')
    song_items.includes(:latest_diff).where(latest_diff: { author: [nil, ''] }).find_each do |song_item|
      song_item.update_author_from_spotify!(spotify_token)
    end
    update!(status: 'spotify_completed') if song_items.completed.count == song_items.count
  end

  def notify_start_create_song_items
    message = "セトリを作成します。\n"
    message << "URL: #{Rails.application.routes.url_helpers.admin_video_url(id)}\n"
    message << "タイトル: #{title}\n"
    message << "Status: #{status}\n"
    SlackNotifier.send(message)
  end

  private

  def song_items_completed?
    song_items.completed.count == song_items.count
  end
end
