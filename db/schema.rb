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

ActiveRecord::Schema.define(version: 2024_01_04_183426) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "abilities", force: :cascade do |t|
    t.string "name"
    t.text "description"
    t.string "icon"
    t.bigint "champion_id"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["champion_id"], name: "index_abilities_on_champion_id"
  end

  create_table "capstone_users", force: :cascade do |t|
    t.string "username"
    t.string "password_digest"
    t.string "display_name"
    t.string "profile_pic"
    t.text "bio"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.string "email"
  end

  create_table "champion_comments", force: :cascade do |t|
    t.text "content"
    t.bigint "capstone_user_id"
    t.bigint "champion_id"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["capstone_user_id"], name: "index_champion_comments_on_capstone_user_id"
    t.index ["champion_id"], name: "index_champion_comments_on_champion_id"
  end

  create_table "champion_regions", force: :cascade do |t|
    t.string "name"
    t.text "description"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
  end

  create_table "champions", force: :cascade do |t|
    t.string "name"
    t.bigint "champion_region_id"
    t.string "splash_art"
    t.date "release_date"
    t.text "lore"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["champion_region_id"], name: "index_champions_on_champion_region_id"
  end

  create_table "comments", force: :cascade do |t|
    t.bigint "user_id", null: false
    t.bigint "post_id", null: false
    t.text "content"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["post_id"], name: "index_comments_on_post_id"
    t.index ["user_id"], name: "index_comments_on_user_id"
  end

  create_table "post_comments", force: :cascade do |t|
    t.text "content"
    t.bigint "capstone_user_id", null: false
    t.bigint "user_post_id", null: false
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["capstone_user_id"], name: "index_post_comments_on_capstone_user_id"
    t.index ["user_post_id"], name: "index_post_comments_on_user_post_id"
  end

  create_table "posts", force: :cascade do |t|
    t.string "title"
    t.text "content"
    t.string "img_url"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
  end

  create_table "user_posts", force: :cascade do |t|
    t.string "title"
    t.text "content"
    t.string "img_url"
    t.bigint "capstone_user_id", null: false
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["capstone_user_id"], name: "index_user_posts_on_capstone_user_id"
  end

  create_table "users", force: :cascade do |t|
    t.string "username"
    t.string "password_digest"
    t.string "display_name"
    t.text "bio"
    t.string "img_url"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
  end

  add_foreign_key "abilities", "champions"
  add_foreign_key "champion_comments", "capstone_users"
  add_foreign_key "champion_comments", "champions"
  add_foreign_key "champions", "champion_regions"
  add_foreign_key "comments", "posts"
  add_foreign_key "comments", "users"
  add_foreign_key "post_comments", "capstone_users"
  add_foreign_key "post_comments", "user_posts"
  add_foreign_key "user_posts", "capstone_users"
end
