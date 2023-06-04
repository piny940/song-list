class Video < ApplicationRecord
  include SongLive

  belongs_to :channel
  has_many :song_items, dependent: :destroy
  has_many :comments, dependent: :destroy
  validates :video_id, presence: true, uniqueness: true

  enum kind: {
    video: 0,
    live: 10,
    short: 20
  }, _prefix: true

  # コメントにセトリを探しに行ったらfetched
  # セトリが確定したら(= セトリが見つかった or 歌枠ではなかったら)completed
  enum status: {
    ready: 0,
    fetched: 10,
    completed: 20
  }, _prefix: true

  def self.fetch_and_create!(video_id)
    response = Youtube.get_video(video_id)
    items = response.items

    return if items.blank?

    raise '与えられたチャンネルの動画ではありません。' \
      if new.channel.present? && new.channel_id != items[0].snippet.channel_id

    return if Video.find_by(video_id:).present?

    channel = Channel.find_by(channel_id: items[0].snippet.channel_id)

    raise 'この動画のチャンネルはデータベースに存在しません' if channel.blank?

    kind = items[0].live_streaming_details.present? ? 'live' : 'video'

    create!(
      video_id:,
      title: items[0].snippet.title,
      response_json: items[0].to_h,
      kind:,
      channel_id: channel.id
    )
  end

  # {
  #   default: {
  #     width: number,
  #     height: number,
  #     url: string,
  #   },
  #   medium: {
  #     width: number,
  #     height: number,
  #     url: string,
  #   },
  #   high: {
  #     width: number,
  #     height: number,
  #     url: string,
  #   },
  # }
  def thumbnails
    response_json['snippet']['thumbnails']
  end

  def description
    response_json['snippet']['description']
  end
end
