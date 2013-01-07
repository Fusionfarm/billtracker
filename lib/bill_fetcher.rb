class BillFetcher
  def self.fetch bill
    bill.bill_data = bill.fetch_from_openstates

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
end
