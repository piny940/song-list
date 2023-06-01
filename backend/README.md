# Rails Template

[English version](https://github.com/piny940/rails-template/blob/main/README.en.md)

API backendとしてRailsを使う場合のRailsのテンプレートです。

## 使用技術

Ruby3.1.2、Rails7.0.5を使用しています。

データベースには[postgresql](https://www.postgresql.org)、ストレージにはGoogle Cloud Storageを使用しています。

また、見た目には[Bootstrap5](https://getbootstrap.jp)、[Google Material Icon](https://fonts.google.com/icons)を使用しています。

## 使い方

`.env`ファイルをトップレベルに配置し、`.env.sample`に従ってGCSのサービスアカウントのキー
(JSON)およびバケット名を配置してください。