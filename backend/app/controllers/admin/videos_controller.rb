class Admin::VideosController < Admin::Base
  before_action :set_video, only: %i[show edit update destroy]
  before_action :set_channel

  def index
    @only_song_lives = (params[:only_song_lives] || 1).to_i.positive?
    @only_incompleted = (params[:only_incompleted] || 1).to_i.positive?

    scope = @channel.present? ? @channel.videos : Video
    scope = scope.song_lives if @only_song_lives
    scope = scope.where.not(status: 'completed') if @only_incompleted

    @videos = scope.order(published_at: :desc).all
  end

  def show; end

  def new
    @video = Video.new
  end

  def edit; end

  def create
    @video = Video.fetch_and_create!([video_params[:video_id]])[0]

    if @video.present?
      redirect_to admin_videos_path(channel_id: @video.channel.id), notice: 'Videoが作成されました。'
    else
      render :new, status: :unprocessable_entity
    end
  end

  def update
    published = video_params[:published].present? ? video_params[:published] == 'true' : @video.published
    if @video.update({ **video_params, published: })
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

  def set_channel
    Rails.logger.debug params[:channel_id]
    @channel = Channel.find_by(id: params[:channel_id] || @video&.channel_id)
  end

  def set_video
    @video = Video.find(params[:id])
  end

  def video_params
    params.require(:video).permit(:channel_id, :video_id, :kind, :title, :status, :published)
  end
end
