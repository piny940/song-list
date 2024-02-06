FactoryBot.define do
  factory :song_diff do
    time { '00:00:00' }
    sequence(:title) { |n| "Song#{n}" }
    sequence(:author) { |n| "Author#{n}" }
    status { 'approved' }
    kind { 'auto' }
  end
end
