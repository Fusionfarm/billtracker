class CreateBills < ActiveRecord::Migration
  def change
    create_table :bills do |t|
      t.string :ext_bill_id
      t.text :reporter_description
      t.text :bill_data

      t.timestamps
    end
  end
end
