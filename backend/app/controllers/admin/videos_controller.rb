class Admin::VideosController < Admin::Base
  before_action :set_channel
  before_action :set_video, only: %i[ show edit update destroy ]

  def index
    @videos = Video.all
  end

  def show; end

  def new
    @video = Video.new
  end

  def edit; end

  def create
    @video = Video.new(video_params)

    if @video.save
      redirect_to admin_channel_videos_path(@channel), notice: "Videoが作成されました。"
    else
      render :new, status: :unprocessable_entity
    end
  end

  def update
    if @video.update(video_params)
      redirect_to admin_channel_videos_path(@channel), notice: "Videoが更新されました。"
    else
      render :edit, status: :unprocessable_entity
    end
  end

  def destroy
    @video.destroy
    redirect_to admin_channel_videos_path(@channel), notice: "Videoが削除されました。"
  end

  private

  def set_channel
    @channel = Channel.find(params[:channel_id])
  end

  def set_video
    @video = Video.find(params[:id])
  end

  def video_params
    params.require(:video).permit(:channel_id, :video_id, :kind, :response_json, :title)
  end
end
