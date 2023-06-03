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
    return if params[:video_id].blank?

    @video = Video.find_by(id: params[:video_id])

    if @video.blank?
      render json: {
        message: 'Video not found'
      }, status: :bad_request
    end
  end

  def set_song_item
    scope = @video.present? ? @video.song_items : SongItem
    @song_item = scope.active.find_by(id: params[:id])

    if @song_item.blank?
      render json: {
        message: 'Song item not found'
      }, status: :bad_request
    end
  end
end
