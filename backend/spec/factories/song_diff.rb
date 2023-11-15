FactoryBot.define do
  factory :song_diff do
    association :song_item
    title { 'title' }
    author { 'author' }
    time { '02:10:10' }
    status { 'approved' }
    kind { 'auto' }
  end
end
