class BillsController < ApplicationController
  before_filter :authenticate_user!, :except => [:index, :show, :annotated]

  # GET /bills
  # GET /bills.json
  def index
    @bills = Bill.all(order: 'session desc, ext_bill_id') if ['json','js'].include?(params[:format])
    @bills = Bill.paginate(order: 'session desc, ext_bill_id', page: params[:page]) unless ['json','js'].include?(params[:format])
    @bills_simple = @bills.map do |bill|
      bill.list_attributes
    end

    respond_to do |format|
      format.html # index.html.erb
      format.json { render json: @bills_simple }
      format.js { render json: @bills_simple, callback: params[:callback] }
    end
  end

  # GET /bills/1
  # GET /bills/1.json
  def show
    @bill = Bill.find(params[:id])

    respond_to do |format|
      format.html # show.html.erb
      format.json { render json: @bill }
    end
  end

  # GET /bills/new
  # GET /bills/new.json
  def new
    @bill = Bill.new

    respond_to do |format|
      format.html # new.html.erb
      format.json { render json: @bill }
    end
  end

  # GET /bills/1/edit
  def edit
    @bill = Bill.find(params[:id])
  end

  # POST /bills
  # POST /bills.json
  def create
    @bill = Bill.new(params[:bill])

    respond_to do |format|
      if @bill.save
        BillFetcher.fetch @bill
        format.html { redirect_to @bill, notice: 'Bill was successfully created.' }
        format.json { render json: @bill, status: :created, location: @bill }
      else
        format.html { render action: "new" }
        format.json { render json: @bill.errors, status: :unprocessable_entity }
      end
    end
  end

  # PUT /bills/1
  # PUT /bills/1.json
  def update
    @bill = Bill.find(params[:id])

    respond_to do |format|
      if @bill.update_attributes(params[:bill])
        format.html { redirect_to @bill, notice: 'Bill was successfully updated.' }
        format.json { head :no_content }
      else
        format.html { render action: "edit" }
        format.json { render json: @bill.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /bills/1
  # DELETE /bills/1.json
  def destroy
    @bill = Bill.find(params[:id])
    @bill.destroy

    respond_to do |format|
      format.html { redirect_to bills_url }
      format.json { head :no_content }
    end
  end

  def fetch
    @bill = Bill.find(params[:id])
    BillFetcher.fetch @bill

    respond_to do |format|
      format.html { redirect_to bill_url(@bill)}
      format.json { head :no_content }
    end
  end

  def annotated
    @bill = Bill.find(params[:id])

    respond_to do |format|
      format.json { render json: @bill.annotated }
      format.js { render json: @bill.annotated, :callback => params[:callback] }
    end
  end
end
