class SongItem < ApplicationRecord
  belongs_to :video
  has_many :song_diffs, dependent: :destroy
  belongs_to :latest_diff, class_name: 'SongDiff', optional: true
  scope :displayed, -> { includes(:video).where(videos: { published: true }) }

  def active?
    latest_diff.present? && !latest_diff.deletion?
  end

  def self.active
    diffs = SongDiff.status_approved.where.not(title: [nil, '']).where.not(time: [nil, ''])
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
      id: SongItem.includes(:latest_diff).where(latest_diff: { title: }).where.not(latest_diff: { author: [nil, ''] }).select(:latest_diff_id)
    ).group(:author).count.max { |x, y| x[1] <=> y[1] }&.first
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
This is a comment below a YouTube video. Determine whether it is a valid set list. If it is a valid set list, convert it into a JSON list of song names and authors.

Always return valid JSON. If invalid JSON is returned, a penalty of $100 will be imposed. If the correct result is returned, an award of $100 will be given.

The format is [{"time": "","title": "","author":""}]. If a field is unknown, put null in the field. Do not return anything other than valid JSON.

The time format will be HH:MM:SS.

All the titles are in the same format. If the title consists of both Japanese and the romaji transcription, only return the Japanese result.

There might be some informational entries, like "start of stream" or "end of stream" or "talk". Do not insert these in the list for those entries.

Sometimes there will be extra description in parentheses. If they are found, do NOT output them in title, unless they are part of the name of the song. If any extra note is outputted in the title, there will be a penalty of $10.

If this is not a set list, return false.
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
      notify_song_items_creation_failed(comment_content, content)
      []
    end
  end

  def self.create_from_json!(songs, comment_id: nil)
    if all.present?
      # SongItemが既に存在する場合はセトリ・コメントをすべて削除して1から確認する
      all.find_each(&:destroy)
      new.video.comments.status_completed.each(&:destroy)
    end

    song_items = []
    songs.each do |song|
      song_item = create!
      song_item.song_diffs.create_from_json!(song, comment_id:)
      song_items.push(song_item)
    end
    song_items = where(id: song_items.map(&:id))

    # Slackに通知
    notify_song_items_created(song_items)

    song_items
  end

  def self.notify_song_items_created(song_items)
    return if song_items.blank?

    message = "セトリが作成されました。\n"
    message << "URL: #{Rails.application.routes.url_helpers.admin_video_song_items_url(new.video_id)}\n"
    song_items.each do |song_item|
      message << "時間: #{song_item.time}, タイトル: #{song_item.title}, 歌手名: #{song_item.author}\n"
    end
    SlackNotifier.send(message)
  end

  def self.notify_song_items_creation_failed(comment_content, openai_output)
    message = "セトリは作成されませんでした。\n"
    message << "URL: #{Rails.application.routes.url_helpers.admin_video_url(new.video_id)}\n"
    message << "コメント: #{comment_content}\n"
    message << "OpenAI出力: #{openai_output}\n"
    SlackNotifier.send(message)
  end
end
