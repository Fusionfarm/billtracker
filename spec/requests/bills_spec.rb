require 'spec_helper'
require 'debugger'

describe "Bills" do
  context "when user logged in" do
    def sign_in_as_user user
      post user_session_path, :user => { :email => user.email, :password => user.password }
    end

    before(:each) do
      sign_in_as_user FactoryGirl.create(:user)
    end

    describe "GET /bills.json" do
      it "returns a list of bills in json format" do
        @bill1 = FactoryGirl.create(:bill_with_annotations, :annotations_count => 2)
        @bill2 = FactoryGirl.create(:bill_with_annotations, :ext_bill_id => 'QQ 123', :annotations_count => 2)
        get bills_path(:format => :json)
        response.body.should include_json(@bill1.list_attributes.to_json)
        response.body.should include_json(@bill2.list_attributes.to_json)
      end
    end

    describe "GET /bills/:id/annotated.json" do
      it "gets annotated bill data" do
        @bill = FactoryGirl.create(:bill_with_annotations)
        get annotated_bill_path(@bill, :format => :json)
        response.body.should include "reporter_description"
        response.body.should include "topics"
        response.body.should include "actions"
        response.body.should include "Action 1"
        response.body.should include "Action 2"
      end
    end

    describe "GET /bills/:id/annotated.js?callback=:callback" do
      it "gets annotated bill data via jsonp" do
        @bill = FactoryGirl.create(:bill_with_annotations)
        get annotated_bill_path(@bill, :callback => 'the_callback', :format => :js)
        response.body.should include "the_callback"
      end
    end

  end
end
