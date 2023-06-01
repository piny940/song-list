class CreateChannels < ActiveRecord::Migration[7.0]
  def change
    create_table :channels do |t|
      t.string :channel_id
      t.string :name
      t.string :twitter_id
      t.json :response_json

      t.timestamps
    end
  end
end
