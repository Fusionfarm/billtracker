class FetchController < ApplicationController
  before_filter :authenticate_user!

  def index
  end

  def create
    BillFetcher.fetch_all Bill.all
    respond_to do |format|
      format.html { redirect_to fetch_path, notice: 'Bills were successfully updated.' }
    end
  end
end
