class SongDiff < ApplicationRecord
  belongs_to :song_item
  belongs_to :made_by, class_name: 'User', optional: true

  enum status: {
    pending: 0,
    approved: 10,
    rejected: 20
  }, _prefix: true

  enum kind: {
    manual: 0,
    auto: 10
  }, _prefix: true

  def deletion?
    time.blank? && title.blank? && author.blank?
  end
end
