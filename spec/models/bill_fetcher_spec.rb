require 'spec_helper'
require 'debugger'

describe BillFetcher do
  it "should fetch a bill" do
    @bill = FactoryGirl.build(:bill)

    stub_request(:get, "http://openstates.org/api/v1/bills/ia/2011-2012/HF%201234/?apikey=#{ENV['SUNLIGHT_API_KEY']}").
      to_return(:status => 200, :body => '{"some":"data"}', :headers => {})

    BillFetcher.fetch @bill
    @bill.bill_data.should eq({"some" => "data", "actions" => []})
  end
end
