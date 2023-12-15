module SongComment
  extend ActiveSupport::Concern

  # コメント本文にセトリが含まれるならsong_itemsを作成
  def create_song_items!
    unless setlist?(content)
      update!(status: 'completed')
      return
    end

    force_create_song_items!
  end

  # セトリが含まれると判断されない場合でもsong_itemsを作成
  def force_create_song_items!
    update!(status: 'fetched')

    song_items = video.song_items.create_from_comment_content!(content)
    update!(status: 'completed')
    song_items
  end

  SETLIST_REGEX = /([0-9]{2}:)?[0-9]?[0-9]:[0-9]{2}/
  def setlist?(text)
    text.scan(SETLIST_REGEX).size >= 3
  end
end
