class Api::SongItemsController < Api::Base
  before_action :set_channel
  before_action :set_video
  before_action :set_song_item, only: %i[show]

  def index
    # チャンネル・動画で絞り込み
    scope = @channel.present? ? @channel.all_song_items : SongItem
    scope = @video.present? ? @video.song_items : scope

    # あいまい検索(タイトル・歌手名)
    scope = scope.joins(:latest_diff)
    scope = if params[:query].present?
              scope.where('song_diffs.title ILIKE ?', "%#{params[:query]}%")
                   .or(scope.where('song_diffs.author ILIKE ?', "%#{params[:query]}%"))
            else
              scope
            end
    
    # 日付で絞り込み
    since_time = params[:since] && Time.zone.parse(params[:since]).beginning_of_day
    until_time = params[:until] && Time.zone.parse(params[:until]).end_of_day
    scope = scope.where(video_id: Video.where(published_at: since_time..until_time))

    scope = scope.active.order('videos.published_at desc, time asc')
    scope.select(:id, :video_id, :latest_diff_id, :created_at, :updated_at)
    scope = scope.includes(:latest_diff, :video)
    @song_items = scope.page(params[:page]).per(params[:count])
    @total_pages = @song_items.total_pages
  end

  def show; end

  private

  def set_channel
    return if params[:channel_id].blank?

    @channel = Channel.find_by(id: params[:channel_id])
    if @channel.blank?
      render json: {
        message: 'Channel not found'
      }, status: :bad_request
    end
  end

  def set_video
    return if params[:video_id].blank?

    @video = Video.find_by(id: params[:video_id])

    if @video.blank?
      render json: {
        message: 'Video not found'
      }, status: :bad_request
    end
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
