class AddColumnToUser < ActiveRecord::Migration[7.0]
  def change
    add_column :users, :kind, :integer, default: 0, null: false
  end
end
