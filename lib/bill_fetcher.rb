class BillFetcher
  def self.fetch bill
    response = HTTParty.get("http://openstates.org/api/v1/bills/#{bill.state.downcase}/#{bill.session}/#{URI.escape(bill.ext_bill_id)}/?apikey=#{ENV['SUNLIGHT_API_KEY']}")

    begin
      bill.bill_data = MultiJson.load response.body
    rescue
      # swallow any parsing errors
    end

    # make sure we have valid data structures
    bill.bill_data = {} if bill.bill_data.nil?
    bill.bill_data['actions'] = [] unless bill.bill_data['actions'].is_a? Array

    # find or create annotations for each action
    bill.bill_data['actions'].each do |action|
      ann = bill.annotations.where(date: action['date'], action: action['action']).limit(1)
      bill.annotations.create(date: action['date'], action: action['action']) if ann.size == 0
    end

    bill.save
  end

  def self.fetch_all bills
    bills.each do |bill|
      self.fetch bill
    end
  end
end
