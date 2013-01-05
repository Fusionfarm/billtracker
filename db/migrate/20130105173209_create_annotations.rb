class CreateAnnotations < ActiveRecord::Migration
  def change
    create_table :annotations do |t|
      t.references :bill
      t.datetime :date
      t.string :action
      t.text :text
      t.text :url

      t.timestamps
    end
    add_index :annotations, :bill_id
  end
end
