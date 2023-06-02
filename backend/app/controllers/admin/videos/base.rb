class Admin::Videos::Base < Admin::Base
  before_action :set_video

  private

  def set_video
    @video = Video.find(params[:video_id])
  end
end
