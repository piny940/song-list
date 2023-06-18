class Api::Member::Base < Api::Base
  before_action :authenticate_member!

  private

  def authenticate_member!
    render json: {
      message: 'アクセスするにはログインが必要です'
    }, status: 400 if current_user.blank?
  end
end
