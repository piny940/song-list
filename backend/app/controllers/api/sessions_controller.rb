class Api::SessionsController < Api::Base
  def create
    user = User.find_by(email: params[:email])
    if user&.valid_password?(params[:password])
      sign_in user
      render json: { message: 'ログインしました',
                     user: }, status: :ok
    else
      render json: { message: 'メールアドレスまたはパスワードが違います' }, status: :bad_request
    end
  end

  def destroy
    sign_out current_user
    render json: { message: 'ログアウトしました', user: nil }, status: :ok
  end
end
