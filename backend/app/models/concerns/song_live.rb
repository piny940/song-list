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

  def parse_setlist(text)
    instruction = <<~EOS
      以下は歌枠のsetlistです。これを時間と曲名と作曲者名のリストに変換してください。

      フォーマットは
      [
          {
            title: "",
            time: "",
              author:""
          }
      ]
      というフォーマットで書いてください。
    EOS
    messages = [
      {
        role: 'system',
        content: instruction
      },
      {
        role: 'assistant',
        content: text
      }
    ]
    OpenAi.complete_chat(messages)
  end
end
