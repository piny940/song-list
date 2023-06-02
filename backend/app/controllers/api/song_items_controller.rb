class Api::SongItemsController < Api::Base
  before_action :set_video

  def index
    scope = @video.present? ? @video.song_items : SongItem
    @song_items = scope.active
    p @song_items.first.song_diffs.last
  end

  private

  def set_video
    return unless params[:video_id].present?

    @video = Video.find_by(id: params[:video_id])

    render json: {
      message: 'Video not found'
    }, status: 400 unless @video.present?
  end
end
