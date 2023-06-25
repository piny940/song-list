class Admin::Videos::SongItems::BulksController < Admin::Videos::Base
  def new; end

  def create
    song_items = if params[:comment_id].present?
                   Comment.find(params[:comment_id]).force_search_and_create_song_items!
                 elsif params[:comment].present?
                   @video.song_items.create_from_comment_content!(params[:comment])
                 else
                   @video.search_and_create_song_items!
                 end
    if song_items.filter(&:completed?).count == song_items.count
      @video.update!(status: 'completed')
    elsif song_items.present?
      @video.update!(status: 'song_items_created')
    end
    redirect_to admin_video_song_items_path(@video)
  end
end
