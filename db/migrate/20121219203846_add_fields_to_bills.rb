class AddFieldsToBills < ActiveRecord::Migration
  def change
    add_column :bills, :state, :string
    add_column :bills, :session, :string
  end
end
