class SongItem < ApplicationRecord
  belongs_to :video
  has_many :song_diffs, dependent: :destroy

  def active?
    return false unless song_diffs.present?
    
    !song_diffs.status_approved.last.deletion?
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
