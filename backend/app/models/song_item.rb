class SongItem < ApplicationRecord
  belongs_to :video
  has_many :song_diffs, dependent: :destroy

  def active?
    return false unless song_diffs.status_approved.present?
    
    !song_diffs.status_approved.last.deletion?
  end

  def self.active
    lasts = SongDiff.status_approved.where(created_at: SongDiff.status_approved \
              .group(:song_item_id).select('max(created_at)'))
    where(id: lasts.where.not(title: ["", nil]).or(lasts.where.not(author: ["", nil])) \
            .or(lasts.where.not(time: ["", nil])).pluck(:song_item_id))
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
end
