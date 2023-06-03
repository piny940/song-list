class Admin::Videos::CommentsController < Admin::Videos::Base
  before_action :set_comment, only: %i[ show edit update destroy ]

  def index
    @comments = @video.comments.all
  end

  def show; end

  def new
    @comment = @video.comments.new
  end

  def edit; end

  def create
    @comment = @video.comments.new(comment_params)

    if @comment.save
      redirect_to admin_video_comments_path(@video), notice: "Commentが作成されました。"
    else
      render :new, status: :unprocessable_entity
    end
  end

  def update
    if @comment.update(comment_params)
      redirect_to admin_video_comments_path(@video), notice: "Commentが更新されました。"
    else
      render :edit, status: :unprocessable_entity
    end
  end

  def destroy
    @comment.destroy
    redirect_to admin_video_comments_path(@video), notice: "Commentが削除されました。"
  end

  private

  def set_comment
    @comment = @video.comments.find(params[:id])
  end

  def comment_params
    params.require(:comment).permit(:video_id, :status, :response_json)
  end
end
