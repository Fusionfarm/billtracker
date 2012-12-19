require 'spec_helper'

describe Bill do
  before { @bill = FactoryGirl.build(:bill) }

  subject { @bill }

  it { should be_instance_of(Bill) }
  it { should respond_to(:ext_bill_id) }
  it { should respond_to(:state) }
  it { should respond_to(:session) }
  it { should respond_to(:reporter_description) }
  it { should respond_to(:bill_data) }

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

  describe "fetch" do
    pending "updates data from openstates" do
      @bill = FactoryGirl.build(:bill)
      @bill.fetch
      @bill.ext_bill_id.should == "HF 1234"
      @bill.reporter_description.should == "A bill to make hunting penguins illegal"
      @bill.bill_data.should == "{ \"some\": \"json\" }"
    end
  end

end
