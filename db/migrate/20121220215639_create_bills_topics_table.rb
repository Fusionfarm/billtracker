class CreateBillsTopicsTable < ActiveRecord::Migration
  def self.up
    create_table :bills_topics, :id => false do |t|
        t.references :bill
        t.references :topic
    end
    add_index :bills_topics, [:bill_id, :topic_id]
    add_index :bills_topics, [:topic_id, :bill_id]
  end

  def self.down
    drop_table :bills_topics
  end
end
