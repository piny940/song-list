class Api::VideosController < Api::Base
  before_action :set_channel
  before_action :set_video, only: %i[show]

  def index
    scope = @channel.videos
    # あいまい検索(タイトル・歌手名)
    scope = scope.where('videos.title ILIKE ?', "%#{params[:query]}%") \
              if params[:query].present?
    # 日付で絞り込み
    since_time = params[:since].present? ? Time.zone.parse(params[:since]).beginning_of_day : nil
    until_time = params[:until].present? ? Time.zone.parse(params[:until]).end_of_day : nil
    scope = scope.where(published_at: since_time..until_time)

    @videos = scope.order(published_at: :desc).page(params[:page]).per(params[:count])
    @total_pages = @videos.total_pages
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
