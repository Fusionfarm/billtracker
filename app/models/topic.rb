class Topic < ActiveRecord::Base
  attr_accessible :name

  validates_presence_of :name

  has_and_belongs_to_many :bills
end
