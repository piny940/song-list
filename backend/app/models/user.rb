class User < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable
  has_many :created_song_diffs, class_name: 'SongDiff', inverse_of: 'made_by', dependent: :nullify, foreign_key: :made_by_id
  validates :name, presence: true, uniqueness: { message: 'が同じユーザーが既に存在します' }

  enum :kind, {
    member: 0,
    banned: 5,
    admin: 10
  }, prefix: true

  def email_required?
    false
  end
end
