class Annotation < ActiveRecord::Base
  belongs_to :bill
  attr_accessible :bill_id, :action, :date, :text, :url
end
