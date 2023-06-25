class SongItem < ApplicationRecord
  belongs_to :video
  has_many :song_diffs, dependent: :destroy
  belongs_to :latest_diff, class_name: 'SongDiff', optional: true

  def active?
    latest_diff.present? && !latest_diff.deletion?
  end

  def self.active
    diffs = SongDiff.status_approved.where.not(title: [nil, '']).where.not(author: [nil, ''])
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
      SongDiff.where.not(title: ['', nil]).where.not(author: ['', nil]).where.not(time: ['', nil]))
  end

  def update_author!(author)
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

  def update_author_from_histroy!
    return self if title.blank?

    # 同一タイトルのSongItemの中で最も採用されているauthor名
    author = SongDiff.where(
      id: SongItem.includes(:latest_diff).where(latest_diff: { title: }).where.not(latest_diff: { author: [nil, ''] }).pluck(:latest_diff_id)
    ).group(:author).count.max{|x, y| x[1] <=> y[1]}&.first
    update_author!(author)
  end

  def update_author_from_spotify!(spotify_token = nil)
    return self if title.blank?

    song_data = Spotify.get_song_data(title, token: spotify_token)
    return self if song_data.blank?

    author = song_data['artists'].pluck('name').join(', ')

    update_author!(author)
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

    begin
      content = OpenAi.complete_chat(messages)
      content = content.gsub(/(u|U)nknown|UNKNOWN|/, '')
      content = content.gsub(/"-"/, '""')
      JSON.parse(content)
    rescue StandardError
      []
    end
  end

  def self.create_from_json!(songs, comment_id: nil)
    if all.present?
      # SongItemが既に存在する場合はセトリ・コメントをすべて削除して1から確認する
      all.each(&:destroy)
      new.video.comments.status_completed.each(&:destroy)
    end

    song_items = []
    songs.each do |song|
      song_item = create!
      song_item.song_diffs.create_from_json!(song, comment_id:)
      song_items.push(song_item)
    end
    song_items
  end
end
