require 'spec_helper'
require 'debugger'

describe BillFetcher do
  it "should fetch a bill" do
    @bill = FactoryGirl.build(:bill)

    stub_request(:get, "http://openstates.org/api/v1/bills/ia/2011-2012/HF%201234/?apikey=#{ENV['SUNLIGHT_API_KEY']}").
      to_return(:status => 200, :body => '{"some":"data"}', :headers => {})

    BillFetcher.fetch @bill
    @bill.bill_data.should eq({"some" => "data", "actions" => [], "action_dates" => {} })
  end

  it "should create annotations" do
    @bill = FactoryGirl.build(:bill)
    @bill.save

    stub_request(:get, "http://openstates.org/api/v1/bills/ia/2011-2012/HF%201234/?apikey=#{ENV['SUNLIGHT_API_KEY']}").
      to_return(:status => 200, :body => '{"actions": [ {"date":"2012-01-01 00:00:00","action":"Introduced"} ] }', :headers => {})

    BillFetcher.fetch @bill
    @bill.annotations.size.should be(1)
  end

  it "should add new annotions" do
    @bill = FactoryGirl.build(:bill)
    @bill.save
    @bill.annotations.create date: Time.zone.local(2012,1,1,0,0,0), action: "Introduced", text: "Annotation", url: 'http://example.com'

    stub_request(:get, "http://openstates.org/api/v1/bills/ia/2011-2012/HF%201234/?apikey=#{ENV['SUNLIGHT_API_KEY']}").
      to_return(:status => 200, :body => '{"actions": [ {"date":"2012-01-01 00:00:00","action":"Introduced"}, {"date":"","action":"Something else"} ] }', :headers => {})

    BillFetcher.fetch @bill
    @bill.annotations.size.should be(2)
  end

  it "should not overwrite existing annotion text and url" do
    @bill = FactoryGirl.build(:bill)
    @bill.save
    @bill.annotations.create date: Time.zone.local(2012,1,1,0,0,0), action: "Introduced", text: "Annotation", url: 'http://example.com'

    stub_request(:get, "http://openstates.org/api/v1/bills/ia/2011-2012/HF%201234/?apikey=#{ENV['SUNLIGHT_API_KEY']}").
      to_return(:status => 200, :body => '{"actions": [ {"date":"2012-01-01 00:00:00","action":"Introduced"}, {"date":"","action":"Something else"} ] }', :headers => {})

    BillFetcher.fetch @bill
    @bill.annotations.first.text.should eq("Annotation")
    @bill.annotations.first.url.should eq("http://example.com")
  end
end
