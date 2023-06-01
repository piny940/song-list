class CreateAdminChannels < ActiveRecord::Migration[7.0]
  def change
    create_table :admin_channels do |t|
      t.string :channel_id
      t.string :name
      t.string :twitter_id
      t.json :response_json

      t.timestamps
    end
  end
end
