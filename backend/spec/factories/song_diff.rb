FactoryBot.define do
  factory :song_diff do
    sequence(:time) { |n| "00:0#{n}:00" }
    sequence(:title) { |n| "Song#{n}" }
    sequence(:author) { |n| "Author#{n}" }
    status { 'approved' }
    kind { 'auto' }
  end
end
