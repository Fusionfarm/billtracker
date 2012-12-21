require 'spec_helper'

describe "Bills" do
  context "when user logged in" do
    def sign_in_as_user user
      visit new_user_session_path
      fill_in "Email", :with => user.email
      fill_in "Password", :with => user.password
      click_link_or_button('Sign in')
    end

    before(:each) do
      sign_in_as_user FactoryGirl.create(:user)
    end

    describe "GET /bills" do
      it "returns a list of bills" do
        # Run the generator again with the --webrat flag if you want to use webrat methods/matchers
        visit bills_path
        page.should have_content "Listing bills"
      end
    end

    describe "GET /bills/new" do
      it "shows the new bill form" do
        visit new_bill_path
        page.should have_selector "#new_bill"
      end
    end

    describe "GET /bills/:id/fetch" do
      it "updates the bill data" do
        @bill = Bill.create FactoryGirl.attributes_for(:bill)
        stub_request(:get, "http://openstates.org/api/v1/bills/#{@bill.state.downcase}/#{@bill.session}/#{@bill.ext_bill_id}/?apikey=#{ENV['SUNLIGHT_API_KEY']}").
         to_return(:status => 200, :body => '{}', :headers => {})
        visit fetch_bill_path(@bill)
        current_path.should eq(bill_path(@bill))
      end
    end
  end
end
