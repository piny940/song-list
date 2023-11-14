FactoryBot.define do
  factory :user do
    sequence(:name) { |n| "test_member#{n}" }
    sequence(:email) { |n| "test_member#{n}@example.com" }
    password 'password'
    password_confirmation 'password'
    kind 'member'
  end
end
