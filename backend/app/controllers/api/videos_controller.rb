class Api::VideosController < Api::Base
  before_action :set_channel
  before_action :set_video, only: %i[show]

  def index
    @videos = @channel.videos
  end

  def show; end

  private

  def set_channel
    @channel = Channel.find(params[:channel_id])
  end

  def set_video
    @video = @channel.videos.find(params[:id])
  end
end
