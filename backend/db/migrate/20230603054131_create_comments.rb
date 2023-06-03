class CreateComments < ActiveRecord::Migration[7.0]
  def change
    create_table :comments do |t|
      t.references :video, null: false, foreign_key: true
      t.integer :status, null: false, default: 0
      t.json :response_json, null: false

      t.timestamps
    end
  end
end
