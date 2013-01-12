# Read about factories at https://github.com/thoughtbot/factory_girl

FactoryGirl.define do
  sequence(:action) {|n| "Action #{n}" }
  factory :annotation do
    bill
    date "2000-01-01 00:00:00"
    action
    text "Or so they say"
    url "http://example.com"
  end
end
