class SongItem < ApplicationRecord
  belongs_to :video
  has_many :song_diffs, dependent: :destroy

  def active?
    return false if song_diffs.status_approved.blank?

    !song_diffs.status_approved.last.deletion?
  end

  def self.active
    lasts = SongDiff.status_approved.where(created_at: SongDiff.status_approved \
              .group(:song_item_id).select('max(created_at)'))
    where(id: lasts.where.not(title: ['', nil]).or(lasts.where.not(author: ['', nil])) \
            .or(lasts.where.not(time: ['', nil])).pluck(:song_item_id))
  end

  def title
    return nil unless active?

    song_diffs.status_approved.last.title
  end

  def author
    return nil unless active?

    song_diffs.status_approved.last.author
  end

  def time
    return nil unless active?

    song_diffs.status_approved.last.time
  end

  def self.create_song_items_from_json(songs)
    song_items = []
    songs.each do |song|
      song_item = create!
      song_item.song_diffs.create!(
        kind: 'auto',
        author: song['autor'],
        time: Time.zone.parse(song['time']),
        title: song['title']
      )
      song_items.push(song_item)
    end
    song_items
  end
end
