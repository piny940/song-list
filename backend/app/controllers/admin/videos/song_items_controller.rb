class Admin::Videos::SongItemsController < Admin::Videos::Base
  before_action :set_song_item, only: %i[show edit update destroy]

  def index
    @song_items = @video.song_items.includes(:latest_diff).order('song_diffs.time asc')
  end

  def show; end

  def new
    @song_item = @video.song_items.new
  end

  def edit; end

  def create
    @song_item = @video.song_items.new(song_item_params)
    return render :new, status: :unprocessable_entity unless @song_item.save

    @song_diff = @song_item.song_diffs.new(song_diff_params.merge({ kind: 'auto' }))
    if @song_diff.save
      @song_diff.update_status!('approved')
      redirect_to admin_video_song_items_path(@video), notice: 'Song itemが作成されました。'
    else
      render :new, status: :unprocessable_entity
    end
  end

  def update
    if @song_item.update(song_item_params)
      redirect_to admin_video_song_items_path(@video), notice: 'Song itemが更新されました。'
    else
      render :edit, status: :unprocessable_entity
    end
  end

  def destroy
    @song_item.destroy
    redirect_to admin_video_song_items_path(@video), notice: 'Song itemが削除されました。'
  end

  private

  def set_song_item
    @song_item = @video.song_items.find(params[:id])
  end

  def song_item_params
    params.expect(song_item: [:video_id])
  end

  def song_diff_params
    params.require(:song_item).require(:song_diff).permit(:time, :title, :author)
  end
end
