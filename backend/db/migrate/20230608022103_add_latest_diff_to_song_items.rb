class AddLatestDiffToSongItems < ActiveRecord::Migration[7.0]
  def up
    add_column :song_items, :latest_diff_id, :integer, index: true
    add_foreign_key :song_items, :song_diffs, column: :latest_diff_id

    SongItem.find_each do |song_item|
      song_item.update!(latest_diff_id: song_item.song_diffs.where(status: 10).last.id)
    end
  end

  def down
    remove_foreign_key :song_items, column: :latest_diff_id
    remove_column :song_items, :latest_diff_id
  end
end