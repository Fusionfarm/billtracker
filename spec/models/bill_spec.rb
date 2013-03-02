require 'spec_helper'
require 'debugger'

describe Bill do
  let(:bill) { FactoryGirl.build(:bill) }

  subject { bill }

  it { should be_instance_of(Bill) }
  it { should respond_to(:ext_bill_id) }
  it { should respond_to(:state) }
  it { should respond_to(:session) }
  it { should respond_to(:reporter_description) }
  it { should respond_to(:bill_data) }
  it { should respond_to(:topics) }
  it { should respond_to(:list_attributes) }
  it { should respond_to(:last_action_date) }

  describe "validations" do
    it "requires an ext_bill_id" do
      FactoryGirl.build(:bill, ext_bill_id: nil).should validate_presence_of(:ext_bill_id)
    end

    it "requires a state" do
      FactoryGirl.build(:bill, state: nil).should validate_presence_of(:state)
    end

    it "requires a session" do
      FactoryGirl.build(:bill, session: nil).should validate_presence_of(:session)
    end
  end

  describe "pagination" do
    subject { Bill }

    it { should respond_to(:per_page) }
    its(:per_page) { should == 10 }
  end

end
