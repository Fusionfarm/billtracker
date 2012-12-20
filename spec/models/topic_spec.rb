require 'spec_helper'

describe Topic do
  before { @topic = FactoryGirl.build(:topic) }

  subject { @topic }

  it { should be_instance_of(Topic) }
  it { should respond_to(:name) }
  it { should respond_to(:bills) }

  describe "#all_alphabetical" do
    it "should provide list of alpha sorted topics" do
      @topic_z = Topic.create :name => "z"
      @topic_a = Topic.create :name => "a"
      @topics = Topic.all_alphabetical
      @topics.should eq([@topic_a,@topic_z])
    end
  end
end
