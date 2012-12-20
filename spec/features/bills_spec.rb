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
      it "works! (now write some real specs)" do
        # Run the generator again with the --webrat flag if you want to use webrat methods/matchers
        visit bills_path
        page.has_content? "Signed in successfully"
      end
    end
  end
end
