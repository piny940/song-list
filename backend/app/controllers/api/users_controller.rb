class Api::UsersController < Api::Base
  def show; end

  def create
    @user = User.new(user_params)
    unless @user.save
      return render json: {
        message: @user.errors.full_messages[0]
      }, status: :bad_request
    end
    sign_in @user
    render status: :created
  end

  private

  def user_params
    params.require(:user).permit(:email, :password, :password_confirmation, :name)
  end
end
