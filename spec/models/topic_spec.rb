require 'spec_helper'

describe Topic do
  before { @topic = FactoryGirl.build(:topic) }

  subject { @topic }

  it { should be_instance_of(Topic) }
  it { should respond_to(:name) }
  it { should respond_to(:bills) }
end
