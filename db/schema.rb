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
# It's strongly recommended to check this file into your version control system.

ActiveRecord::Schema.define(:version => 20130302211247) do

  create_table "annotations", :force => true do |t|
    t.integer  "bill_id"
    t.datetime "date"
    t.string   "action"
    t.text     "text"
    t.text     "url"
    t.datetime "created_at", :null => false
    t.datetime "updated_at", :null => false
  end

  add_index "annotations", ["bill_id"], :name => "index_annotations_on_bill_id"

  create_table "bills", :force => true do |t|
    t.string   "ext_bill_id"
    t.text     "reporter_description"
    t.text     "bill_data"
    t.datetime "created_at",           :null => false
    t.datetime "updated_at",           :null => false
    t.string   "state"
    t.string   "session"
    t.datetime "last_action_date"
  end

  add_index "bills", ["ext_bill_id"], :name => "index_bills_on_ext_bill_id"
  add_index "bills", ["last_action_date"], :name => "index_bills_on_last_action_date"

  create_table "bills_topics", :id => false, :force => true do |t|
    t.integer "bill_id"
    t.integer "topic_id"
  end

  add_index "bills_topics", ["bill_id", "topic_id"], :name => "index_bills_topics_on_bill_id_and_topic_id"
  add_index "bills_topics", ["topic_id", "bill_id"], :name => "index_bills_topics_on_topic_id_and_bill_id"

  create_table "mentions", :force => true do |t|
    t.string   "url",           :limit => 8000
    t.string   "excerpt",       :limit => 4000
    t.string   "title",         :limit => 1000
    t.string   "source"
    t.datetime "date"
    t.float    "weight"
    t.integer  "owner_id"
    t.string   "owner_type"
    t.string   "search_source"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "topics", :force => true do |t|
    t.string   "name"
    t.datetime "created_at", :null => false
    t.datetime "updated_at", :null => false
  end

  create_table "users", :force => true do |t|
    t.string   "email",                  :default => "", :null => false
    t.string   "encrypted_password",     :default => "", :null => false
    t.string   "reset_password_token"
    t.datetime "reset_password_sent_at"
    t.datetime "remember_created_at"
    t.integer  "sign_in_count",          :default => 0
    t.datetime "current_sign_in_at"
    t.datetime "last_sign_in_at"
    t.string   "current_sign_in_ip"
    t.string   "last_sign_in_ip"
    t.datetime "created_at",                             :null => false
    t.datetime "updated_at",                             :null => false
    t.string   "name"
  end

  add_index "users", ["email"], :name => "index_users_on_email", :unique => true
  add_index "users", ["reset_password_token"], :name => "index_users_on_reset_password_token", :unique => true

end
