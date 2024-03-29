class Api::SongItemsController < Api::Base
  before_action :set_channel
  before_action :set_video
  before_action :set_song_item, only: %i[show]

  def index
    # チャンネル・動画で絞り込み
    scope = @channel.present? ? @channel.all_song_items.displayed : SongItem.displayed
    scope = @video.song_items if @video.present?

    # あいまい検索(タイトル・歌手名)
    scope = scope.joins(:latest_diff)
    if params[:query].present?
      scope = scope.where('song_diffs.title ILIKE ?', "%#{params[:query]}%")
                   .or(scope.where('song_diffs.author ILIKE ?', "%#{params[:query]}%"))
    end

    # 日付で絞り込み
    since_time = params[:since].present? ? Time.zone.parse(params[:since]).beginning_of_day : nil
    until_time = params[:until].present? ? Time.zone.parse(params[:until]).end_of_day : nil
    scope = scope.where(video_id: Video.where(published_at: since_time..until_time))

    # 枠名で絞り込み
    scope = scope.where(video_id: Video.where('videos.title ILIKE ?', "%#{params[:video_title]}%")) \
              if params[:video_title].present?

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

    @channel = Channel.kind_published.find_by(id: params[:channel_id])
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
