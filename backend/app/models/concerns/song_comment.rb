module SongComment
  extend ActiveSupport::Concern

  # コメント本文にセトリが含まれるならsong_itemsを作成
  def search_and_create_song_items
    unless setlist?(content)
      update!(status: 'completed')
      return
    end

    update!(status: 'fetched')
    songs = parse_setlist
    update!(status: 'completed')

    return if songs.blank?

    video.song_items.create_song_items_from_json(songs)
  end

  private

  def parse_setlist
    instruction = <<~EOS
      以下はYoutubeの動画のコメントです。これが曲のセットリストであるかを判定し、セットリストであるならばこれを時間と曲名と作曲者名のリストに変換してください。

      フォーマットは
      [{"title": "","time": "","author":""}]
      というフォーマットで書いてください。内容が不明な箇所には'unknown'と書いてください。

      セットリストでない場合はfalseと返してください。
    EOS
    messages = [
      {
        role: 'system',
        content: instruction
      },
      {
        role: 'assistant',
        content:
      }
    ]
    content = OpenAi.complete_chat(messages)
    content = content.gsub(/unknown|UNKNOWN|/, '')
    content = content.gsub(/"-"/, '""')

    begin
      JSON.parse(content)
    rescue StandardError
      []
    end
  end

  SETLIST_REGEX = /セトリ|セットリスト|せっとりすと|(s|S)et(\s|_)?(l|L)ist/
  def setlist?(text)
    !!text.match(SETLIST_REGEX)
  end
end
