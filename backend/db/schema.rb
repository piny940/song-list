# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `bin/rails
# db:schema:load`. When creating a new database, `bin/rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema[7.0].define(version: 2023_06_02_102529) do
  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "channels", force: :cascade do |t|
    t.string "channel_id", null: false
    t.string "name"
    t.string "twitter_id"
    t.json "response_json"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "song_diffs", force: :cascade do |t|
    t.bigint "song_item_id", null: false
    t.integer "made_by_id", null: false
    t.datetime "time"
    t.string "title"
    t.string "author"
    t.integer "status", default: 0, null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["made_by_id"], name: "index_song_diffs_on_made_by_id"
    t.index ["song_item_id"], name: "index_song_diffs_on_song_item_id"
  end

  create_table "song_items", force: :cascade do |t|
    t.bigint "video_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["video_id"], name: "index_song_items_on_video_id"
  end

  create_table "users", force: :cascade do |t|
    t.string "email", default: "", null: false
    t.string "encrypted_password", default: "", null: false
    t.string "reset_password_token"
    t.datetime "reset_password_sent_at"
    t.datetime "remember_created_at"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.integer "kind", default: 0, null: false
    t.index ["email"], name: "index_users_on_email", unique: true
    t.index ["reset_password_token"], name: "index_users_on_reset_password_token", unique: true
  end

  create_table "videos", force: :cascade do |t|
    t.bigint "channel_id", null: false
    t.string "video_id", null: false
    t.integer "kind", default: 0, null: false
    t.json "response_json", null: false
    t.string "title", null: false
    t.integer "status", default: 0, null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["channel_id"], name: "index_videos_on_channel_id"
  end

  add_foreign_key "song_diffs", "song_items"
  add_foreign_key "song_diffs", "users", column: "made_by_id"
  add_foreign_key "song_items", "videos"
  add_foreign_key "videos", "channels"
end
