class Api::UsersController < Api::Base
  def create
    @user = User.new(user_params)
    if !@user.save
      return render json: {
        message: @user.errors.full_messages[0]
      }, status: 400
    end
    render status: 201
  end

  private

  def user_params
    params.require(:user).permit(:email, :password, :password_confirmation, :name)
  end
end
