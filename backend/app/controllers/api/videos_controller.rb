class Api::VideosController < Api::Base
  before_action :set_channel
  before_action :set_video, only: %i[show]

  def index
    scope = @channel.present? ? @channel.videos : Video
    # あいまい検索(タイトル・歌手名)
    scope = scope.where('videos.title ILIKE ?', "%#{params[:query]}%") \
              if params[:query].present?
    # 日付で絞り込み
    since_time = params[:since].present? ? Time.zone.parse(params[:since]).beginning_of_day : nil
    until_time = params[:until].present? ? Time.zone.parse(params[:until]).end_of_day : nil
    scope = scope.where(published_at: since_time..until_time)

    # 歌枠のみに絞り込み
    scope = scope.song_lives.where(id: SongItem.active.select(:video_id)) if params[:only_song_lives].to_i.positive?

    @videos = scope.order(published_at: :desc).page(params[:page]).per(params[:count])
    @total_pages = @videos.total_pages
  end

  def show; end

  private

  def set_channel
    return if params[:channel_id].blank?

    @channel = Channel.kind_published.find_by(id: params[:channel_id])
    if @channel.blank?
      render json: {
        message: 'Channel not found'
      }, status: :bad_request
    end
  end

  def set_video
    @video = Video.find(params[:id])
  end
end
