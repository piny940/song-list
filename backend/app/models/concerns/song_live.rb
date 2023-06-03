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
end
