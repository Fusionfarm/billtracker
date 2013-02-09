require 'spec_helper'
require 'debugger'

describe Annotation do
  let!(:annotation) { FactoryGirl.build(:annotation) }
  #before { @annotation = FactoryGirl.build(:annotation) }

  subject { annotation }

  it { should be_instance_of(Annotation) }
  it { should respond_to(:bill_id) }
  it { should respond_to(:date) }
  it { should respond_to(:action) }
  it { should respond_to(:text) }
  it { should respond_to(:url) }

  context "with no bill_id" do
    before { annotation.bill_id = nil }
    it { should_not be_valid}
  end

  context "with no date" do
    before { annotation.date = nil }
    it { should_not be_valid}
  end

  context "with no action" do
    before { annotation.action = nil }
    it { should_not be_valid}
  end
end