class Api::Member::Base < Api::Base
  before_action :authenticate_member!

  private

  def authenticate_member!
    if current_user.blank?
      render json: {
        message: 'アクセスするにはログインが必要です'
      }, status: :bad_request
    end
  end
end
