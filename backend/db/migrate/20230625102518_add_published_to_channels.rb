class AddPublishedToChannels < ActiveRecord::Migration[7.0]
  def change
    add_column :channels, :published, :boolean, null: false, default: false
  end
end
