require 'spec_helper'

describe FetchController do

  context "user is logged in" do
    before (:each) do
      @user = FactoryGirl.create(:user)
      sign_in @user    
    end

    describe "GET 'index'" do
      it "returns http success" do
        get 'index'
        response.should be_success
      end
    end
  end

  context "user is logged out" do
    describe "GET 'index'" do
      it "redirects to sign in page" do
        get 'index'
        response.should redirect_to(new_user_session_path)
      end
    end    
  end
end
