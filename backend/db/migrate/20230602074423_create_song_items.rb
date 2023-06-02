class CreateSongItems < ActiveRecord::Migration[7.0]
  def change
    create_table :song_items do |t|
      t.references :video, null: false, foreign_key: true

      t.timestamps
    end
  end
end
