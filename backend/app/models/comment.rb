class Comment < ApplicationRecord
  include SongComment

  belongs_to :video
  validates :comment_id, presence: true, uniqueness: true

  # セトリのコメントでない場合はcompleted、
  # セトリのコメントの場合は、OpenAIで調べたらcompleted、エラーが起こったらfetched
  enum status: {
    ready: 0,
    fetched: 10,
    completed: 20
  }

  def content
    response_json.dig('snippet', 'top_level_comment', 'snippet', 'text_original')
  end
end
