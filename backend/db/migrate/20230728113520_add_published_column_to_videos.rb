class AddPublishedColumnToVideos < ActiveRecord::Migration[7.0]
  def change
    add_column :videos, :published, :boolean, null: false, default: true
  end
end
