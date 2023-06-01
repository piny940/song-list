class CreateVideos < ActiveRecord::Migration[7.0]
  def change
    create_table :videos do |t|
      t.references :channel, null: false, foreign_key: true
      t.string :video_id, null: false
      t.integer :kind, null: false, default: 0
      t.json :response_json, null: false
      t.string :title, null: false

      t.timestamps
    end
  end
end
