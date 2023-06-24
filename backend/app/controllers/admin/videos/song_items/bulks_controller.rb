class Admin::Videos::SongItems::BulksController < Admin::Videos::Base
  def new; end

  def create
    @video.song_items.create_from_comment_content!(params[:comment]) if params[:comment].present?
    redirect_to admin_video_song_items_path(@video)
  end
end
