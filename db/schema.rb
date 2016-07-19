# encoding: UTF-8
# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20160719081305) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "artists", force: :cascade do |t|
    t.string   "provider",               default: "email", null: false
    t.string   "uid",                    default: "",      null: false
    t.string   "encrypted_password",     default: "",      null: false
    t.string   "reset_password_token"
    t.datetime "reset_password_sent_at"
    t.datetime "remember_created_at"
    t.integer  "sign_in_count",          default: 0,       null: false
    t.datetime "current_sign_in_at"
    t.datetime "last_sign_in_at"
    t.string   "current_sign_in_ip"
    t.string   "last_sign_in_ip"
    t.string   "name"
    t.string   "email"
    t.string   "username"
    t.string   "nickname"
    t.string   "description"
    t.string   "website"
    t.string   "contact"
    t.json     "tokens"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.string   "avatar_file_name"
    t.string   "avatar_content_type"
    t.integer  "avatar_file_size"
    t.datetime "avatar_updated_at"
  end

  add_index "artists", ["email"], name: "index_artists_on_email", using: :btree
  add_index "artists", ["reset_password_token"], name: "index_artists_on_reset_password_token", unique: true, using: :btree
  add_index "artists", ["uid", "provider"], name: "index_artists_on_uid_and_provider", unique: true, using: :btree
  add_index "artists", ["username"], name: "index_artists_on_username", unique: true, using: :btree

  create_table "artworks", force: :cascade do |t|
    t.string   "title"
    t.string   "description"
    t.string   "size"
    t.string   "medium"
    t.string   "status"
    t.string   "barcode"
    t.string   "category"
    t.float    "rent_price"
    t.date     "available_date"
    t.string   "location"
    t.integer  "artist_id"
    t.datetime "created_at",                 null: false
    t.datetime "updated_at",                 null: false
    t.string   "artwork_image_file_name"
    t.string   "artwork_image_content_type"
    t.integer  "artwork_image_file_size"
    t.datetime "artwork_image_updated_at"
  end

  create_table "bubbles", force: :cascade do |t|
    t.string   "artist_bubble"
    t.string   "rentee_bubble"
    t.datetime "artist_bubble_time_stamp"
    t.datetime "rentee_bubble_time_stamp"
    t.integer  "reservation_id"
    t.datetime "created_at",               null: false
    t.datetime "updated_at",               null: false
  end

  create_table "galleries", force: :cascade do |t|
    t.integer  "rentee_id"
    t.datetime "created_at",                    null: false
    t.datetime "updated_at",                    null: false
    t.string   "location_picture_file_name"
    t.string   "location_picture_content_type"
    t.integer  "location_picture_file_size"
    t.datetime "location_picture_updated_at"
    t.string   "title"
    t.text     "description"
    t.string   "location"
  end

  create_table "rentees", force: :cascade do |t|
    t.string   "provider",               default: "email", null: false
    t.string   "uid",                    default: "",      null: false
    t.string   "encrypted_password",     default: "",      null: false
    t.string   "reset_password_token"
    t.datetime "reset_password_sent_at"
    t.datetime "remember_created_at"
    t.integer  "sign_in_count",          default: 0,       null: false
    t.datetime "current_sign_in_at"
    t.datetime "last_sign_in_at"
    t.string   "current_sign_in_ip"
    t.string   "last_sign_in_ip"
    t.string   "name"
    t.string   "email"
    t.string   "username"
    t.string   "nickname"
    t.string   "description"
    t.string   "website"
    t.string   "contact"
    t.string   "location"
    t.string   "business_type"
    t.json     "tokens"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.string   "avatar_file_name"
    t.string   "avatar_content_type"
    t.integer  "avatar_file_size"
    t.datetime "avatar_updated_at"
  end

  add_index "rentees", ["email"], name: "index_rentees_on_email", using: :btree
  add_index "rentees", ["reset_password_token"], name: "index_rentees_on_reset_password_token", unique: true, using: :btree
  add_index "rentees", ["uid", "provider"], name: "index_rentees_on_uid_and_provider", unique: true, using: :btree
  add_index "rentees", ["username"], name: "index_rentees_on_username", unique: true, using: :btree

  create_table "reservations", force: :cascade do |t|
    t.date     "start_reservation_date"
    t.date     "end_reservation_date"
    t.integer  "artwork_id"
    t.integer  "artist_id"
    t.integer  "rentee_id"
    t.datetime "created_at",             null: false
    t.datetime "updated_at",             null: false
  end

end
