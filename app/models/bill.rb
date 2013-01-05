class Bill < ActiveRecord::Base
  attr_accessible :bill_data, :ext_bill_id, :state, :session, :reporter_description, :topic_ids, :annotations_attributes

  validates_presence_of :ext_bill_id, :state, :session

  serialize :bill_data, JSON

  has_and_belongs_to_many :topics
  has_many :annotations

  accepts_nested_attributes_for :annotations

  def fetch_from_openstates
    response = HTTParty.get("http://openstates.org/api/v1/bills/#{self.state.downcase}/#{self.session}/#{URI.escape(self.ext_bill_id)}/?apikey=#{ENV['SUNLIGHT_API_KEY']}")
    MultiJson.load response.body
  end
end
