class Api::SongItemsController < Api::Base
  before_action :set_video
  before_action :set_song_item, only: %i[show]

  def index
    scope = @video.present? ? @video.song_items : SongItem
    @song_items = scope.active
  end

  def show; end

  private

  def set_video
    return unless params[:video_id].present?

    @video = Video.find_by(id: params[:video_id])

    render json: {
      message: 'Video not found'
    }, status: 400 unless @video.present?
  end

  def set_song_item
    scope = @video.present? ? @video.song_items : SongItem
    @song_item = scope.active.find_by(id: params[:id])

    render json: {
      message: 'Song item not found'
    }, status: 400 unless @song_item.present?
  end
end
