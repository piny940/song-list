FactoryBot.define do
  factory :channel do
    sequence(:name) { |n| "test_channel#{n}" }
    sequence(:channel_id) { |n| "UCe_8qM8Wk4cU5oD3WO07gZg#{n}" }
    sequence(:twitter_id) { |n| "twitter_id#{n}" }
    kind { 'published' }
    custom_name { 'しゃいる' }
    response_json {
      {
        "etag": "HAaxd7j8Ol22PWVfnayFkJS1DAc",
        "id": "UCe_8qM8Wk4cU5oD3WO07gZg",
        "kind": "youtube#channel",
        "snippet":
          {
            "customUrl": "@shairu.ch_0801",
            "description": "",
            "localized": { "description": "", "title": "Shairu.chしゃいる" },
            "publishedAt": "2022-05-02T16:27:52.314+00:00",
            "thumbnails":
              {
                "default":
                  {
                    "height": 88,
                    "url": "https://yt3.ggpht.com/y0FOLFDkm0ONyt1yEi7b1CoSyCyTtY1MLKLF3vSmeqIZSOe7gDCxXS5Oc9pXmIvY4OusTFf4=s88-c-k-c0x00ffffff-no-rj",
                    "width": 88,
                  },
                "high":
                  {
                    "height": 800,
                    "url": "https://yt3.ggpht.com/y0FOLFDkm0ONyt1yEi7b1CoSyCyTtY1MLKLF3vSmeqIZSOe7gDCxXS5Oc9pXmIvY4OusTFf4=s800-c-k-c0x00ffffff-no-rj",
                    "width": 800,
                  },
                "medium":
                  {
                    "height": 240,
                    "url": "https://yt3.ggpht.com/y0FOLFDkm0ONyt1yEi7b1CoSyCyTtY1MLKLF3vSmeqIZSOe7gDCxXS5Oc9pXmIvY4OusTFf4=s240-c-k-c0x00ffffff-no-rj",
                    "width": 240,
                  },
              },
            "title": "Shairu.chしゃいる",
          },
      }
    }
  end
end
