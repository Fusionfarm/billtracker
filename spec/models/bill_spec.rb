require 'spec_helper'
require 'debugger'

describe Bill do
  before { @bill = FactoryGirl.build(:bill) }

  subject { @bill }

  it { should be_instance_of(Bill) }
  it { should respond_to(:ext_bill_id) }
  it { should respond_to(:state) }
  it { should respond_to(:session) }
  it { should respond_to(:reporter_description) }
  it { should respond_to(:bill_data) }
  it { should respond_to(:topics) }

  describe "validations" do
    it "requires an ext_bill_id" do
      FactoryGirl.build(:bill, ext_bill_id: nil).should_not be_valid
    end

    it "requires a state" do
      FactoryGirl.build(:bill, state: nil).should_not be_valid
    end

    it "requires a session" do
      FactoryGirl.build(:bill, session: nil).should_not be_valid
    end
  end

end
