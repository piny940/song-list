FactoryBot.define do
  factory :song_item do
    association(video: :video)
    association(latest_diff: :song_item_diff)
  end
end
