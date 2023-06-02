class SongItem < ApplicationRecord
  belongs_to :video
  has_many :song_diffs, dependent: :destroy
end
