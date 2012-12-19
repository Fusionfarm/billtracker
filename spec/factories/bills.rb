# Read about factories at https://github.com/thoughtbot/factory_girl

FactoryGirl.define do
  factory :bill do
    ext_bill_id "HF 1234"
    reporter_description "A bill to make hunting penguins illegal"
    bill_data ""
  end
end
