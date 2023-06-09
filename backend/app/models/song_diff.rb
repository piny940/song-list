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

  def self.create_from_json!(song, comment_id: nil)
    time = song['time'].length == 5 ? "00:#{song['time']}" : song['time']
    diff = create!(
      kind: 'auto',
      author: song['author'],
      time: Time.zone.parse(time),
      title: song['title'],
      comment_id:
    )
    diff.update_status!('approved')
    diff
  end

  def update_status!(new_status)
    SongItem.transaction do
      update!(status: new_status)
      song_item.update!(latest_diff_id: song_item.song_diffs.status_approved.last.id)
    end
  end
end
