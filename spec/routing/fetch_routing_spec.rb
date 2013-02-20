require "spec_helper"

describe FetchController do
  describe "routing" do

    it "routes to #index" do
      get("/fetch").should route_to("fetch#index")
    end

  end
end
