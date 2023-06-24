class Admin::Videos::SongItems::BulksController < Admin::Videos::Base
  def new; end

  def create
    p params[:comment]
    redirect_to admin_video_song_items_path(@video)
  end
end
