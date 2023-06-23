class Admin::Videos::SongItemsController < Admin::Videos::Base
  before_action :set_song_item, only: %i[show edit update destroy]

  def index
    @song_items = @video.song_items.includes(:latest_diff).all
  end

  def show; end

  def new
    @song_item = @video.song_items.new
  end

  def edit; end

  def create
    @song_item = @video.song_items.new(song_item_params)

    if @song_item.save
      comment = params[:comment]
      @song_item.
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
    params.require(:song_item).permit(:video_id)
  end
end
