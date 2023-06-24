class Admin::Videos::SongItems::BulksController < Admin::Videos::Base
  def new; end

  def create
    if params[:comment_id]
      song_items = Comment.find(params[:comment_id]).force_search_and_create_song_items!
    else
      song_items = @video.song_items.create_from_comment_content!(params[:comment]) if params[:comment].present?
    end
    @video.update!(status: 'completed') if song_items.present?
    redirect_to admin_video_song_items_path(@video)
  end
end
