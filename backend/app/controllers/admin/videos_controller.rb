class Admin::VideosController < Admin::Base
  before_action :set_video, only: %i[show edit update destroy]

  def index
    channel = Channel.find_by(id: params[:channel_id])
    scope = channel.present? ? channel.videos : Video
    @videos = scope.order(published_at: :desc).all
  end

  def show; end

  def new
    @video = Video.new
  end

  def edit; end

  def create
    @video = Video.fetch_and_create!(video_params[:video_id])

    if @video.present?
      redirect_to admin_videos_path(channel_id: @video.channel.id), notice: 'Videoが作成されました。'
    else
      render :new, status: :unprocessable_entity
    end
  end

  def update
    if @video.update(video_params)
      redirect_to admin_videos_path(channel_id: @video.channel.id), notice: 'Videoが更新されました。'
    else
      render :edit, status: :unprocessable_entity
    end
  end

  def destroy
    @video.destroy
    redirect_to admin_videos_path(channel_id: @video.channel.id), notice: 'Videoが削除されました。'
  end

  private

  def set_video
    @video = Video.find(params[:id])
  end

  def video_params
    params.require(:video).permit(:channel_id, :video_id, :kind, :title, :status)
  end
end
