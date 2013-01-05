# Read about factories at https://github.com/thoughtbot/factory_girl

FactoryGirl.define do
  factory :annotation do
    bill nil
    date "2013-01-05 11:32:09"
    action "MyString"
    text "MyText"
    url "MyText"
  end
end
