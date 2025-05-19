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
      @song_diff.update_status!(params[:song_diff][:status]) if params[:song_diff][:status].present?
      redirect_to admin_video_song_item_song_diffs_path(@video, @song_item), notice: 'Song diffが作成されました。'
    else
      render :new, status: :unprocessable_entity
    end
  end

  def update
    if @song_diff.update(song_diff_params)
      @song_diff.update_status!(params[:song_diff][:status]) if params[:song_diff][:status].present?
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
    params.expect(song_diff: %i[made_by_id kind time title author])
  end
end
