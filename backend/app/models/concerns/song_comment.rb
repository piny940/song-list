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

  private

  SETLIST_REGEX = /セトリ|セットリスト|タイム(テーブル|スタンプ)|曲集|(t|T)ime(\ |_)?(s|S)tamps?|せっとりすと|SET ?LIST|(s|S)et(\s|_)?(l|L)ist|ｓｏｎｇ|(s|S)ong(\ |_)?(l|L)ist/
  def setlist?(text)
    !!text.match(SETLIST_REGEX)
  end
end
