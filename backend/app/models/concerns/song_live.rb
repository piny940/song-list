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

  def search_songs
    songs = []

    loop do
      page_token = nil
      response = Youtube.get_comments_data(video_id, page_token)

      break if response.items.nil?

      response.items.each do |item|
        next if Comment.find_by(comment_id: item.id).present?

        comment = comments.create!(response_json: item.to_h)
        songs = comment.search_songs
        break if songs.present?
      end
      break if songs.present?

      page_token = response.next_page_token
      break if page_token.blank?
    end

    songs
  end
end
