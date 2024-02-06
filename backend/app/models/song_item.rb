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

    song_items = create_from_hash!(songs)

    # Slackに通知
    notify_song_items_created(song_items)

    song_items
  end

  def self.parse_setlist(comment_content)
    instruction = <<~EOS
      You are a helpful assistant.

      This is a comment below a YouTube video. Determine whether it is a valid set list. If it is a valid set list, convert it into a JSON list of song names and authors.

      The format is [{"time": "","title": "","author":""}]. If a field is unknown, put null in the field. Do not return anything other than valid JSON.

      The time format will be HH:MM:SS.

      All the titles are in the same format. If the title consists of both Japanese and the romaji transcription, only return the Japanese result.

      Sometimes there will be extra description in parentheses. If they are found, do NOT output them in title, unless they are part of the name of the song. If any extra note is outputted in the title, there will be a penalty of $10.

      xxx / yyy or xxx ／ yyy, [xxx / yyy], [xxx ／ yyy] means that the title is xxx and the composer is yyy.
      Please do not include the OP or ED in the set list.

      日本語で返してください。韓国語はすべて省略してください。
    EOS
    messages = [
      {
        role: 'system',
        content: instruction
      },
      {
        role: 'user',
        content: comment_content
      }
    ]

    begin
      content = OpenAi.complete_chat(messages)
      JSON.parse(content)
    rescue StandardError
      notify_song_items_creation_failed(comment_content, content)
      []
    end
  end

  def self.create_from_hash!(songs, comment_id: nil)
    # セトリをすべて削除してから作成
    find_each(&:destroy)

    songs.map do |song|
      song_item = create!
      time = format_time(song['time'])
      song_diff = song_item.song_diffs.create!(
        kind: 'auto',
        author: song['author'],
        time:,
        title: song['title'],
        comment_id:
      )
      song_diff.update_status!('approved')
      song_item
    end
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

  def self.format_time(time)
    case time.length
    when 4
      "00:0#{time}"
    when 5
      "00:#{time}"
    when 7
      "0#{time}"
    else
      time
    end
  end
end
