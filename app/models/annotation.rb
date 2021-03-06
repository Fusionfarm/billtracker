class Annotation < ActiveRecord::Base
  belongs_to :bill
  attr_accessible :bill_id, :action, :date, :text, :url

  validates_presence_of :bill_id, :action, :date
end
