class Bill < ActiveRecord::Base
  attr_accessible :bill_data, :ext_bill_id, :state, :session, :reporter_description

  validates_presence_of :ext_bill_id, :state, :session

  def fetch
    # grab data from openstates and update self
    bill = GovKit::OpenStates::Bill.find('IA', '2011-2012', 'HF 2115')
  end
end
