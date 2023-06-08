class Api::SongItemsController < Api::Base
  before_action :set_channel
  before_action :set_video
  before_action :set_song_item, only: %i[show]

  def index
    scope = @channel.present? ? @channel.all_song_items : SongItem
    scope = @video.present? ? @video.song_items : scope
    @song_items = scope.includes(:latest_diff, :video).active
  end

  def show; end

  private

  def set_channel
    return if params[:channel_id].blank?

    @channel = Channel.find_by(id: params[:channel_id])
    render json: {
      message: 'Channel not found'
    }, status: :bad_request if @channel.blank?
  end

  def set_video
    return if params[:video_id].blank?

    @video = Video.find_by(id: params[:video_id])

    render json: {
      message: 'Video not found'
    }, status: :bad_request if @video.blank?
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
