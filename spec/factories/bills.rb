# Read about factories at https://github.com/thoughtbot/factory_girl

FactoryGirl.define do
  factory :bill do
    ext_bill_id "HF 1234"
    state "ia"
    session "2011-2012"
    reporter_description "A bill to make hunting penguins illegal"

    factory :bill_with_annotations do
      ignore do
        annotations_count 2
      end
      after(:create) do |bill, evaluator|
        FactoryGirl.create_list(:annotation, evaluator.annotations_count, bill: bill)
      end
      bill_data {
        {
          "actions" => [
            { "date" => "2000-01-01", "action" => "Action 1" },
            { "date" => "2000-01-01", "action" => "Action 2" }
          ]
        }
      }
    end
  end
end
