class Admin::Videos::SongDiffsController < Admin::Videos::Base
  before_action :set_song_item
  before_action :set_song_diff, only: %i[show edit update destroy]

  def index
    @song_diffs = @song_item.song_diffs.all
  end

  def show; end

  def new
    @song_diff = @song_item.song_diffs.new
  end

  def edit; end

  def create
    @song_diff = @song_item.song_diffs.new(song_diff_params)

    if @song_diff.save
      redirect_to admin_video_song_item_song_diffs_path(@video, @song_item), notice: 'Song diffが作成されました。'
    else
      render :new, status: :unprocessable_entity
    end
  end

  def update
    if @song_diff.update(song_diff_params)
      redirect_to admin_video_song_item_song_diffs_path(@video, @song_item), notice: 'Song diffが更新されました。'
    else
      render :edit, status: :unprocessable_entity
    end
  end

  def destroy
    @song_diff.destroy
    redirect_to admin_video_song_item_song_diffs_path(@video, @song_item), notice: 'Song diffが削除されました。'
  end

  private

  def set_song_item
    @song_item = @video.song_items.find(params[:song_item_id])
  end

  def set_song_diff
    @song_diff = @song_item.song_diffs.find(params[:id])
  end

  def song_diff_params
    params.require(:song_diff).permit(:made_by_id, :time, :title, :author, :status)
  end
end
