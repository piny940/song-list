FactoryBot.define do
  factory :video do
    channel
    sequence(:video_id) { |n| "video#{n}" }
    sequence(:title) { |n| "Video#{n}" }
    published_at { Time.zone.now }
    published { true }
    kind { 'live' }
    status { 'completed' }

    trait :unpublished do
      published { false }
    end
  end
end
