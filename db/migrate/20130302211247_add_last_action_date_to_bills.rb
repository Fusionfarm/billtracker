class AddLastActionDateToBills < ActiveRecord::Migration
  def change
    add_column :bills, :last_action_date, :datetime
    add_index :bills, :last_action_date
    add_index :bills, :ext_bill_id
  end
end
