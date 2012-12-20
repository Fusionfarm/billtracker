class Bill < ActiveRecord::Base
  attr_accessible :bill_data, :ext_bill_id, :state, :session, :reporter_description

  validates_presence_of :ext_bill_id, :state, :session

  has_and_belongs_to_many :topics

  def fetch_from_openstates
    bill = GovKit::OpenStates::Bill.find(self.state, self.session, self.ext_bill_id)
    bill.raw_response.parsed_response
  end
end
