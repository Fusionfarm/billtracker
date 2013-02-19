class FetchController < ApplicationController
  before_filter :authenticate_user!

  def index
  end

  def create
    respond_to do |format|
      format.html { redirect_to fetch_path }
    end
  end
end
