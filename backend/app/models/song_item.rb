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

  def self.create_from_json!(songs, comment_id:nil)
    song_items = []
    songs.each do |song|
      song_item = create!
      song_item.song_diffs.create_from_json!(song, comment_id:)
      song_items.push(song_item)
    end
    song_items
  end
end
