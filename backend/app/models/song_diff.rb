class SongDiff < ApplicationRecord
  belongs_to :song_item
  belongs_to :made_by, class_name: 'User', optional: true

  enum :status, {
    pending: 0,
    approved: 10,
    rejected: 20
  }, prefix: true

  enum :kind, {
    manual: 0,
    auto: 10
  }, prefix: true

  def deletion?
    time.blank? || title.blank?
  end

  def update_status!(new_status)
    SongItem.transaction do
      update!(status: new_status)
      song_item.update!(latest_diff_id: song_item.song_diffs.status_approved.last.id)
    end
  end
end
