module SongLive
  extend ActiveSupport::Concern

  module ClassMethods
    def song_lives
      where('title LIKE ?', '%歌枠%')
    end
  end

  def song_live?
    !!title.match('歌枠')
  end

  def search_and_create_song_items
    # 歌枠でない場合はstatusをcompleteにして終了
    unless song_live?
      update!(status: 'completed')
      return []
    end

    update!(status: 'fetched')

    # completedではないコメントは再度調べる
    comments.where.not(status: 'completed').find_each do |comment|
      song_items = comment.search_and_create_song_items

      # SongItemsが見つかったらそこで終了
      if song_items.present?
        update!(status: 'completed')
        return song_items
      end
    end

    # 新しいコメントを探しに行く
    page_token = nil
    loop do
      response = Youtube.get_comments_data(video_id, page_token:)

      break if response.items.nil?

      response.items.each do |item|
        # すでに調査済みのコメントはスルー
        next if Comment.find_by(comment_id: item.id).present?

        comment = comments.create!(comment_id: item.id, response_json: item.to_h)
        song_items = comment.search_and_create_song_items

        # SongItemsが見つかり次第終了
        if song_items.present?
          update!(status: 'completed')
          return song_items
        end
      end

      page_token = response.next_page_token
      break if page_token.blank?
    end

    # SongItemsが見つからなかったらここに来る
    []
  end
end
