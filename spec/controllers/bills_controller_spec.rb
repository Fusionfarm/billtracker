require 'spec_helper'

# This spec was generated by rspec-rails when you ran the scaffold generator.
# It demonstrates how one might use RSpec to specify the controller code that
# was generated by Rails when you ran the scaffold generator.
#
# It assumes that the implementation code is generated by the rails scaffold
# generator.  If you are using any extension libraries to generate different
# controller code, this generated spec may or may not pass.
#
# It only uses APIs available in rails and/or rspec-rails.  There are a number
# of tools you can use to make these specs even more expressive, but we're
# sticking to rails and rspec-rails APIs to keep things simple and stable.
#
# Compared to earlier versions of this generator, there is very limited use of
# stubs and message expectations in this spec.  Stubs are only used when there
# is no simpler way to get a handle on the object needed for the example.
# Message expectations are only used when there is no simpler way to specify
# that an instance is receiving a specific message.

describe BillsController do

  before(:each) do
    @topics = [Topic.create(:name => "Commerce"), Topic.create(:name => "Regulations")]
  end

  # This should return the minimal set of attributes required to create a valid
  # Bill. As you add validations to Bill, be sure to
  # update the return value of this method accordingly.
  def valid_attributes
    { "ext_bill_id" => "HF 1234", "state" => "IA", "session" => "2011-2012", "topic_ids" => [@topics[0].id,@topics[1].id] }
  end

  # This should return the minimal set of values that should be in the session
  # in order to pass any filters (e.g. authentication) defined in
  # BillsController. Be sure to keep this updated too.
  def valid_session
    {"warden.user.user.key" => session["warden.user.user.key"]}
  end

  context "user is logged in" do
    before(:each) do
      sign_in FactoryGirl.create(:user)
    end

    describe "GET new" do
      it "assigns a new bill as @bill" do
        get :new, {}, valid_session
        assigns(:bill).should be_a_new(Bill)
      end
    end

    describe "GET edit" do
      it "assigns the requested bill as @bill" do
        bill = Bill.create! valid_attributes
        get :edit, {:id => bill.to_param}, valid_session
        assigns(:bill).should eq(bill)
      end
    end

    describe "POST create" do
      before(:each) do
        # Just make sure fetch returns something
        BillFetcher.stub(:fetch).and_return("")
      end

      describe "with valid params" do
        it "creates a new Bill" do
          expect {
            post :create, {:bill => valid_attributes}, valid_session
          }.to change(Bill, :count).by(1)
        end

        it "assigns a newly created bill as @bill" do
          post :create, {:bill => valid_attributes}, valid_session
          assigns(:bill).should be_a(Bill)
          assigns(:bill).should be_persisted
        end

        it "redirects to the created bill" do
          post :create, {:bill => valid_attributes}, valid_session
          response.should redirect_to(Bill.last)
        end
      end

      describe "with invalid params" do
        it "assigns a newly created but unsaved bill as @bill" do
          # Trigger the behavior that occurs when invalid params are submitted
          Bill.any_instance.stub(:save).and_return(false)
          post :create, {:bill => { "ext_bill_id" => "invalid value" }}, valid_session
          assigns(:bill).should be_a_new(Bill)
        end

        it "re-renders the 'new' template" do
          # Trigger the behavior that occurs when invalid params are submitted
          Bill.any_instance.stub(:save).and_return(false)
          post :create, {:bill => { "ext_bill_id" => "invalid value" }}, valid_session
          response.should render_template("new")
        end
      end
    end

    describe "PUT update" do
      describe "with valid params" do
        it "updates the requested bill" do
          bill = Bill.create! valid_attributes
          # Assuming there are no other bills in the database, this
          # specifies that the Bill created on the previous line
          # receives the :update_attributes message with whatever params are
          # submitted in the request.
          Bill.any_instance.should_receive(:update_attributes).with({ "ext_bill_id" => "MyString" })
          put :update, {:id => bill.to_param, :bill => { "ext_bill_id" => "MyString" }}, valid_session
        end

        it "assigns the requested bill as @bill" do
          bill = Bill.create! valid_attributes
          put :update, {:id => bill.to_param, :bill => valid_attributes}, valid_session
          assigns(:bill).should eq(bill)
        end

        it "redirects to the bill" do
          bill = Bill.create! valid_attributes
          put :update, {:id => bill.to_param, :bill => valid_attributes}, valid_session
          response.should redirect_to(bill)
        end
      end

      describe "with invalid params" do
        it "assigns the bill as @bill" do
          bill = Bill.create! valid_attributes
          # Trigger the behavior that occurs when invalid params are submitted
          Bill.any_instance.stub(:save).and_return(false)
          put :update, {:id => bill.to_param, :bill => { "ext_bill_id" => "invalid value" }}, valid_session
          assigns(:bill).should eq(bill)
        end

        it "re-renders the 'edit' template" do
          bill = Bill.create! valid_attributes
          # Trigger the behavior that occurs when invalid params are submitted
          Bill.any_instance.stub(:save).and_return(false)
          put :update, {:id => bill.to_param, :bill => { "ext_bill_id" => "invalid value" }}, valid_session
          response.should render_template("edit")
        end
      end
    end

    describe "DELETE destroy" do
      it "destroys the requested bill" do
        bill = Bill.create! valid_attributes
        expect {
          delete :destroy, {:id => bill.to_param}, valid_session
        }.to change(Bill, :count).by(-1)
      end

      it "redirects to the bills list" do
        bill = Bill.create! valid_attributes
        delete :destroy, {:id => bill.to_param}, valid_session
        response.should redirect_to(bills_url)
      end
    end
  end

  context "user is logged out" do
    describe "GET index" do
      it "assigns all bills as @bills" do
        bill = Bill.create! valid_attributes
        get :index, {}, valid_session
        assigns(:bills).should eq([bill])
      end

      context "viewing as html" do
        it "paginates" do
          (Bill.per_page+1).times { Bill.create! valid_attributes }
          bills = Bill.all
          get :index, {}, valid_session
          assigns(:bills).should eq(bills[0..(Bill.per_page-1)])
        end

        it "should order by session desc, bill id asc" do
          bills = [
            FactoryGirl.create(:bill, ext_bill_id: 'HF 102', session: '2011-2012'),
            FactoryGirl.create(:bill, ext_bill_id: 'HF 101', session: '2011-2012'),
            FactoryGirl.create(:bill, ext_bill_id: 'HF 100', session: '2013-2014')
          ]
          get :index, {}, valid_session
          assigns(:bills).should eq([ bills[2], bills[1], bills[0] ])          
        end
      end

      context "viewing as js" do
        it "does not paginate" do
          (Bill.per_page+1).times { Bill.create! valid_attributes }
          bills = Bill.all
          get :index, {:format => :js}, valid_session
          assigns(:bills).should eq(bills)
        end
      end

      context "viewing as json" do
        it "does not paginate" do
          (Bill.per_page+1).times { Bill.create! valid_attributes }
          bills = Bill.all
          get :index, {:format => :json}, valid_session
          assigns(:bills).should eq(bills)
        end
      end
    end

    describe "GET show" do
      it "assigns the requested bill as @bill" do
        bill = Bill.create! valid_attributes
        get :show, {:id => bill.to_param}, valid_session
        assigns(:bill).should eq(bill)
      end
    end

    describe "GET annotated" do
      it "assigns the requested bill as @bill" do
        bill = Bill.create! valid_attributes
        get :show, {:id => bill.to_param}, valid_session
        assigns(:bill).should eq(bill)
      end
    end

    describe "GET new" do
      it "redirects to sign in page" do
        get :new, {}, valid_session
        response.should redirect_to(new_user_session_path)
      end
    end

    describe "GET edit" do
      it "redirects to sign in page" do
        bill = Bill.create! valid_attributes
        get :edit, {:id => bill.to_param}, valid_session
        response.should redirect_to(new_user_session_path)
      end
    end

    describe "POST create" do
      describe "with valid params" do
        it "redirects to sign in page" do
          post :create, {:bill => valid_attributes}, valid_session
          response.should redirect_to(new_user_session_path)
        end
      end

      describe "with invalid params" do
        it "redirects to sign in page" do
          # Trigger the behavior that occurs when invalid params are submitted
          Bill.any_instance.stub(:save).and_return(false)
          post :create, {:bill => { "ext_bill_id" => "invalid value" }}, valid_session
          response.should redirect_to(new_user_session_path)
        end
      end
    end

    describe "PUT update" do
      describe "with valid params" do
        it "redirects to sign in page" do
          bill = Bill.create! valid_attributes
          # Assuming there are no other bills in the database, this
          # specifies that the Bill created on the previous line
          # receives the :update_attributes message with whatever params are
          # submitted in the request.
          put :update, {:id => bill.to_param, :bill => { "ext_bill_id" => "MyString" }}, valid_session
          response.should redirect_to(new_user_session_path)
        end
      end

      describe "with invalid params" do
        it "redirects to sign in page" do
          bill = Bill.create! valid_attributes
          # Trigger the behavior that occurs when invalid params are submitted
          put :update, {:id => bill.to_param, :bill => { "ext_bill_id" => "invalid value" }}, valid_session
          response.should redirect_to(new_user_session_path)
        end
      end
    end

    describe "DELETE destroy" do
      it "redirects to sign in page" do
        bill = Bill.create! valid_attributes
        delete :destroy, {:id => bill.to_param}, valid_session
        response.should redirect_to(new_user_session_path)
      end
    end
  end

end
