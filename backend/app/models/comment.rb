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
  }, _prefix: true

  def self.create_from_youtube!(items)
    items.map do |item|
      # すでに調査済みのコメントはスルー
      return nil if find_by(comment_id: item.id).present?

      comments.create!(
        comment_id: item.id,
        response_json: item.to_h,
        author: item.snippet.top_level_comment.snippet.author_display_name,
        content: item.snippet.top_level_comment.snippet.text_original
      )
    end.compact
  end
end
