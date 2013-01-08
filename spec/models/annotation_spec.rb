require 'spec_helper'
require 'debugger'

describe Annotation do
  before { @annotation = FactoryGirl.build(:annotation) }

  subject { @annotation }

  it { should be_instance_of(Annotation) }
  it { should respond_to(:bill_id) }
  it { should respond_to(:date) }
  it { should respond_to(:action) }
  it { should respond_to(:text) }
  it { should respond_to(:url) }

  describe "validations" do
    it "requires an bill_id" do
      FactoryGirl.build(:annotation, bill_id: nil).should_not be_valid
    end

    it "requires a date" do
      FactoryGirl.build(:annotation, date: nil).should_not be_valid
    end

    it "requires a action" do
      FactoryGirl.build(:annotation, action: nil).should_not be_valid
    end
  end

end
