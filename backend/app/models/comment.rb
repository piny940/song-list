class Comment < ApplicationRecord
  belongs_to :video

  # セトリのコメントでない場合はcompleted、
  # セトリのコメントの場合は、OpenAIで調べたらcompleted、エラーが起こったらfetched
  enum status: {
    ready: 0,
    fetched: 10,
    completed: 20
  }
end
