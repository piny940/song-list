class Admin::Videos::Base < Admin::Base
  before_action :set_video

  private

  def set_video
    @video = @channel.videos.find(params[:video_id])
  end
end
