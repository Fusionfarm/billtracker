# Read about factories at https://github.com/thoughtbot/factory_girl

FactoryGirl.define do
  factory :topic do
    name "Hunting"
  end

  factory :topic_education do
    name "Education"
  end

  factory :topic_farming do
    name "Farming"
  end
end
