class Api::Member::SongDiffsController < Api::Member::Base
  before_action :set_song_item

  def index
    @song_diffs = @song_item.song_diffs.order(id: :desc).page(params[:page]).per(params[:count])
    @next_song_diff = @song_item.song_diffs.where(id: ...@song_diffs.last).order(id: :desc).first
    @total_pages = @song_diffs.total_pages
  end

  def create
    data = song_diff_params.merge({
                                    made_by_id: current_user.id
                                  })
    @song_diff = @song_item.song_diffs.new(data)

    if @song_diff.save
      @song_diff.update_status!('approved') if @song_diff.made_by.kind == 'admin'
      render status: :created
    else
      render json: {
        message: '歌情報を修正できませんでした。'
      }, status: :bad_request
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
