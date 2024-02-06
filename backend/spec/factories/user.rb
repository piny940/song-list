FactoryBot.define do
  factory :user do
    sequence(:name) { |n| "User#{n}" }
    password { Devise::Encryptor.digest(User, 'password') }
  end
end
