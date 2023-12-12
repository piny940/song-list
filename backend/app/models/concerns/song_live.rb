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
      where(status: %w[song_items_created fetched_history spotify_fetched spotify_completed]) \
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

    # Slackに通知
    notify_start_create_song_items

    # 一旦セトリ・コメントをすべて削除して1から確認する
    song_items.find_each(&:destroy)
    comments.status_completed.each(&:destroy)

    update!(status: 'fetched')

    # completedではないコメントは再度調べる
    comments.where.not(status: 'completed').find_each do |comment|
      song_items = comment.search_and_create_song_items!

      # SongItemsが見つかったらそこで終了
      if song_items.present?
        if song_items_completed?
          update!(status: 'completed')
        else
          update!(status: 'song_items_created')
        end
        return song_items
      end
    end

    # 新しいコメントを探しに行く
    page_token = nil
    loop do
      begin
        response = Youtube.get_video_comments(video_id, page_token:)
      rescue Google::Apis::ClientError
        break
      end
      break if response.items.nil?

      response.items.each do |item|
        # すでに調査済みのコメントはスルー
        next if Comment.find_by(comment_id: item.id).present?

        comment = comments.create!(
          comment_id: item.id,
          response_json: item.to_h,
          author: item.snippet.top_level_comment.snippet.author_display_name,
          content: item.snippet.top_level_comment.snippet.text_original
        )
        song_items = comment.search_and_create_song_items!

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
      break if page_token.blank?
    end

    # SongItemsが見つからなかったらここに来る
    []
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
