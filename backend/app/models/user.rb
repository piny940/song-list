class User < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable
  has_many :created_song_diffs, class_name: 'SongDiff', inverse_of: 'made_by'

  enum kind: {
    member: 0,
    admin: 10
  }, _prefix: true
end
