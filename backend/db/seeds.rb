# frozen_string_literal: true
# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: "Star Wars" }, { name: "Lord of the Rings" }])
#   Character.create(name: "Luke", movie: movies.first)

# 管理者ユーザーを作成
User.create!(
  name: '管理者',
  email: ENV.fetch('ADMIN_USER'),
  password: ENV.fetch('ADMIN_PASSWORD'),
  kind: 'admin'
)
