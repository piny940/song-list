# SongList

Vtuberが歌枠で歌った曲のデータベースです。曲名や作者名・枠名などで検索が出来ます。

注意: スクレイピングを使用するため、backendサーバーにはchromedriverのインストールが必要です。

## 過去のすべての動画をcreate
- `docker build -t song-list-rails-ubuntu -f  backend/Dockerfile.ubuntu ./backend` (初回のみ)
- `docker run -it --net=song-lists_default --env-file backend/.env song-list-rails-ubuntu RAILS_ENV=production bundle exec rails channels:create_all_videos`
