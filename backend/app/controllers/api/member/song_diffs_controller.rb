class Api::Member::SongDiffsController < Api::Member::Base
  before_action :set_song_item

  def index
    @song_diffs = @song_item.song_diffs.order(id: :desc)
  end

  def create; end

  private

  def set_song_item
    @song_item = SongItem.find(params[:song_item_id])
  end
end
