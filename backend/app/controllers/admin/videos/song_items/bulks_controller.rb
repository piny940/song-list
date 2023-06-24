class Admin::Videos::SongItems::BulksController < Admin::Videos::Base
  def new; end

  def create
    if params[:comment_id].present?
      song_items = Comment.find(params[:comment_id]).force_search_and_create_song_items!
    elsif params[:comment].present?
      song_items = @video.song_items.create_from_comment_content!(params[:comment])
    else
      song_items = @video.search_and_create_song_items!
    end
    @video.update!(status: 'completed') if song_items.present?
    redirect_to admin_video_song_items_path(@video)
  end
end
