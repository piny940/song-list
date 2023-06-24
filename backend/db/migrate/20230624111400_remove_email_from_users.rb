class RemoveEmailFromUsers < ActiveRecord::Migration[7.0]
  def up
    change_column :users, :email, :string, null: true
    remove_index :users, :email
    add_index :users, :name, unique: true
  end

  def down
    change_column :users, :email, :string, null: false
    add_index :users, :email
    remove_index :users, :name
  end
end
