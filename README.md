# SongList

Vtuberが歌枠で歌った曲のデータベースです。曲名や作者名・枠名などで検索が出来ます。

注意: backendサーバーにはchromedriverのインストールが必要です。

## 本番環境
- 各`.env.sample`に従い`.env`を設定
- `docker compose up -d`

## 開発環境
- `postgres`, `redis`をインストール
- バックエンド
  - `bundle install`
  - `bundle exec db:create`
  - `bundle exec db:migrate`
  - `bundle exec db:seed`
  - `bundle exec rails s`
  - `bundle exec sidekiq`
- フロントエンド
  - `yarn install`
  - `yarn dev`

## 過去の全ての配信を取得する
- `docker build -t song-list-rails-ubuntu -f  backend/Dockerfile.ubuntu ./backend` (コードを更新した場合のみ)
- `docker run -it --net=song-list_default --env-file backend/.env song-list-rails-ubuntu sh -c "RAILS_ENV=production bundle exec rails channels:create_all_videos"`

## 全ての動画のセトリを作成する
- `docker run -it --net=song-list_default --env-file backend/.env song-list-rails sh -c "RAILS_ENV=production bundle exec rails videos:create_all_setlists"`
