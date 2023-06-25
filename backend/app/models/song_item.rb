class SongItem < ApplicationRecord
  belongs_to :video
  has_many :song_diffs, dependent: :destroy
  belongs_to :latest_diff, class_name: 'SongDiff', optional: true

  def active?
    latest_diff.present? && !latest_diff.deletion?
  end

  def self.active
    diffs = SongDiff.status_approved.where.not(title: nil)
                    .or(SongDiff.status_approved.where.not(author: nil))
                    .or(SongDiff.status_approved.where.not(time: nil))
    where(latest_diff_id: diffs.select(:id))
  end

  def title
    latest_diff&.title
  end

  def author
    latest_diff&.author
  end

  def time
    latest_diff&.time
  end

  def completed?
    title.present? && author.present? && time.present?
  end

  def self.completed
    where(latest_diff_id:
      SongDiff.where.not(title: ['', nil]).where.not(author: ['', nil]).where.not(time: ['', nil])
    )
  end

  def update_author_from_spotify!(spotify_token=nil)
    return self if title.blank?

    song_data = Spotify.get_songs_data(title, limit: 1, token: spotify_token).first
    return self if song_data.blank?
    author = song_data.dig('artists').map{|data| data['name']}.join(', ')

    if latest_diff&.kind == 'auto'
      latest_diff.update!(author:)
    else
      diff = song_diffs.create!(
        time:,
        title:,
        author:,
        kind: 'auto'
      )
      diff.update_status!('approved')
    end
  end

  def self.create_from_comment_content!(content)
    songs = parse_setlist(content)
    return unless songs.is_a?(Enumerable)

    create_from_json!(songs)
  end

  def self.parse_setlist(comment_content)
    instruction = <<~EOS
      以下はYoutubeの動画のコメントです。これが曲のセットリストであるかを判定し、セットリストであるならばこれを時間と曲名と作曲者名のリストに変換してください。

      フォーマットは
      [{"title": "","time": "","author": ""}]
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
        content: comment_content
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

  def self.create_from_json!(songs, comment_id: nil)
    song_items = []
    songs.each do |song|
      song_item = create!
      song_item.song_diffs.create_from_json!(song, comment_id:)
      song_items.push(song_item)
    end
    song_items
  end
end
