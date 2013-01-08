namespace :bills do
  task :update => :environment do
    Bill.all.each do |bill|
      BillFetcher.fetch bill
      bill.save
    end
  end
end
