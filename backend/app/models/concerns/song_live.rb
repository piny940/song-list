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
        content: text
      }
    ]
    content = OpenAi.complete_chat(messages)
    content = content.grep(/unknown|UNKNOWN|/, "")
    content = content.grep(/\"-\"/, '""')
    
    begin
      JSON.parse(content)
    rescue => exception
      []
    end
  end
end
