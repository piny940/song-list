class Admin::Videos::Base < Admin::Base
  before_action :set_video
  before_action :set_channel

  private

  def set_video
    @video = Video.find(params[:video_id])
  end

  def set_channel
    @channel = @video.channel
  end
end
