class Api::Member::SongDiffsController < Api::Member::Base
  before_action :set_song_item

  def index
    @song_diffs = @song_item.song_diffs.order(id: :desc)
  end

  def create
    @song_diff = @song_item.song_diffs.new(**song_diff_params.merge({
      made_by_id: current_user.id
    }))

    if @song_diff.save
      render status: :created
    else
      render json: {
        message: '歌情報を修正できませんでした。'
      }, status: 400
    end
  end

  private

  def set_song_item
    @song_item = SongItem.find(params[:song_item_id])
  end

  def song_diff_params
    params.require(:song_diff).permit(:time, :title, :author)
  end
end
