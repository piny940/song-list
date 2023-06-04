class CreateSongDiffs < ActiveRecord::Migration[7.0]
  def change
    create_table :song_diffs do |t|
      t.references :song_item, null: false, foreign_key: true
      t.integer :made_by_id, index: true
      t.datetime :time
      t.string :title
      t.string :author
      t.integer :status, null: false, default: 0
      t.integer :kind, null: false, default: 0

      t.timestamps
    end
    add_foreign_key :song_diffs, :users, column: :made_by_id
  end
end
