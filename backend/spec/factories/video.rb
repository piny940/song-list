FactoryBot.define do
  factory :video do
    channel
    sequence(:video_id) { |n| "video#{n}" }
    sequence(:title) { |n| "Video#{n}" }
    published_at { Time.zone.now }
    published { true }
    kind { 'live' }
    status { 'completed' }
    response_json {
      {
        "etag": "zBjpHZUqH-SqgHP7thRRP07C0KI",
        "id": "1I55fc-EfIM",
        "kind": "youtube#video",
        "live_streaming_details": {
          "active_live_chat_id": "Cg0KCzFJNTVmYy1FZklNKicKGFVDZV84cU04V2s0Y1U1b0QzV08wN2daZxILMUk1NWZjLUVmSU0",
          "actual_start_time": "2023-06-01T12:31:38.000+00:00",
          "concurrent_viewers": 342,
          "scheduled_start_time": "2023-06-01T12:30:00.000+00:00",
        },
        "snippet": {
          "category_id": "10",
          "channel_id": "UCe_8qM8Wk4cU5oD3WO07gZg",
          "channel_title": "Shairu.chしゃいる",
          "default_audio_language": "ja",
          "description": "新人Vtuberのしゃいるです！n雪と星のバーチャル魔法使いです❄🌟nn🌟メンバーシップnhttps://www.youtube.com/channel/UCe_8qM8Wk4cU5oD3WO07gZg/joinnn❄しゃいるTwitternhttps://twitter.com/Shairu_VtnYouTube: https://onl.sc/bhpNHttnn🌟FANBOXnhttps://shairu-vt.fanbox.cc/nn🌟欲しい物リストnhttps://www.amazon.jp/hz/wishlist/ls/2YDTE6JI65ODR?ref_=wl_sharennn❄キャラクターデザインnむにんしきﾏﾏnhttps://twitter.com/muninshikinnn🌟Live2D制作nmemenoﾊﾟﾊﾟnhttps://twitter.com/mementojainnn❄ロゴデザインnボロ雑巾様nhttps://twitter.com/Boro_Dayonn❄スタンプデザインnぱんじゃむのなめ様nhttps://twitter.com/nononanamemenn- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -n※注意事項※n・配信の流れと無関係かつ自分勝手なコメントは読むことが出来ません。n・お名前が読めない方（特に海外の方）のコメントは拾いにくいので、ユーザー名の後ろにフリガナを振ってください。nn- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - nnn❄使用させて頂いた素材nnn【素材】nOKUMONO様 nhttps://twitter.com/okumono1nnうさねこメモリー様nhttps://twitter.com/usanekomemorynnn【BGM】nn灰澈様　「星萤火」「星茶会」nhttps://www.youtube.com/channel/UCku-CBQ-sj4SwN9AQHJzOtAnnしゃろう様nhttps://www.youtube.com/@SharounnRYU ITO MUSIC様nhttps://www.youtube.com/@RYUITOMUSICn- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -nn使用させて頂きましたnnアニソンカラオケ制作室:野田工房nhttps://www.youtube.com/@user-jd7ni1mt5gnn生音風カラオケ屋様nhttps://www.youtube.com/@UCZ3ryrdsdqezi2q-AfRw6Rw nnカラオケ歌っちゃ王様nhttps://www.youtube.com/@uta-cha-ohnnサウンドマン音楽製作channel様nhttps://www.youtube.com/@channel-pb6nxnnカラオケ MUEステ様nhttps://www.youtube.com/@UCARXmJGXap2HyecGs-GiaKQ nn是非チャンネル登録と高評価、Twitterのフォローよろしくお願いします❄nしゃいるの事応援してもらえたらうれしいです🌟",
          "live_broadcast_content": "live",
          "localized": {
            "description": "新人Vtuberのしゃいるです！n雪と星のバーチャル魔法使いです❄🌟nn🌟メンバーシップnhttps://www.youtube.com/channel/UCe_8qM8Wk4cU5oD3WO07gZg/joinnn❄しゃいるTwitternhttps://twitter.com/Shairu_VtnYouTube: https://onl.sc/bhpNHttnn🌟FANBOXnhttps://shairu-vt.fanbox.cc/nn🌟欲しい物リストnhttps://www.amazon.jp/hz/wishlist/ls/2YDTE6JI65ODR?ref_=wl_sharennn❄キャラクターデザインnむにんしきﾏﾏnhttps://twitter.com/muninshikinnn🌟Live2D制作nmemenoﾊﾟﾊﾟnhttps://twitter.com/mementojainnn❄ロゴデザインnボロ雑巾様nhttps://twitter.com/Boro_Dayonn❄スタンプデザインnぱんじゃむのなめ様nhttps://twitter.com/nononanamemenn- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -n※注意事項※n・配信の流れと無関係かつ自分勝手なコメントは読むことが出来ません。n・お名前が読めない方（特に海外の方）のコメントは拾いにくいので、ユーザー名の後ろにフリガナを振ってください。nn- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - nnn❄使用させて頂いた素材nnn【素材】nOKUMONO様 nhttps://twitter.com/okumono1nnうさねこメモリー様nhttps://twitter.com/usanekomemorynnn【BGM】nn灰澈様　「星萤火」「星茶会」nhttps://www.youtube.com/channel/UCku-CBQ-sj4SwN9AQHJzOtAnnしゃろう様nhttps://www.youtube.com/@SharounnRYU ITO MUSIC様nhttps://www.youtube.com/@RYUITOMUSICn- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -nn使用させて頂きましたnnアニソンカラオケ制作室:野田工房nhttps://www.youtube.com/@user-jd7ni1mt5gnn生音風カラオケ屋様nhttps://www.youtube.com/@UCZ3ryrdsdqezi2q-AfRw6Rw nnカラオケ歌っちゃ王様nhttps://www.youtube.com/@uta-cha-ohnnサウンドマン音楽製作channel様nhttps://www.youtube.com/@channel-pb6nxnnカラオケ MUEステ様nhttps://www.youtube.com/@UCARXmJGXap2HyecGs-GiaKQ nn是非チャンネル登録と高評価、Twitterのフォローよろしくお願いします❄nしゃいるの事応援してもらえたらうれしいです🌟",
            "title": "【#歌枠 】初見さん大歓迎だよ～！！周年まであと３日！うたうぞおおおっ！【#新人vtuber/しゃいる】",
          },
          "published_at": "2023-06-01T12:05:17.000+00:00",
          "thumbnails": {
            "default": {
              "height": 90,
              "url": "https://i.ytimg.com/vi/1I55fc-EfIM/default_live.jpg",
              "width": 120,
            },
            "high": {
              "height": 360,
              "url": "https://i.ytimg.com/vi/1I55fc-EfIM/hqdefault_live.jpg",
              "width": 480,
            },
            "maxres": {
              "height": 720,
              "url": "https://i.ytimg.com/vi/1I55fc-EfIM/maxresdefault_live.jpg",
              "width": 1280,
            },
            "medium": {
              "height": 180,
              "url": "https://i.ytimg.com/vi/1I55fc-EfIM/mqdefault_live.jpg",
              "width": 320,
            },
            "standard": {
              "height": 480,
              "url": "https://i.ytimg.com/vi/1I55fc-EfIM/sddefault_live.jpg",
              "width": 640,
            },
          },
          "title": "【#歌枠 】初見さん大歓迎だよ～！！周年まであと３日！うたうぞおおおっ！【#新人vtuber/しゃいる】",
        },
      }
    }

    trait :unpublished do
      published { false }
    end
  end
end
