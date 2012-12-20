# Read about factories at https://github.com/thoughtbot/factory_girl

FactoryGirl.define do
  factory :bill do
    ext_bill_id "HF 1234"
    state "ia"
    session "2011-2012"
    reporter_description "A bill to make hunting penguins illegal"
  end
end
