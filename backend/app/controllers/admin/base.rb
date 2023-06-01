class Admin::Base < ApplicationController
  before_action :authenticate_admin!

  private

  def authenticate_admin!
    redirect_to root_path, alert: '管理者専用ページです' unless current_user&.kind_admin?
  end
end
