class AddPublishedToChannels < ActiveRecord::Migration[7.0]
  def change
    add_column :channels, :kind, :integer, null: false, default: 0
    add_column :channels, :status, :integer, null: false, default: 0
  end
end
