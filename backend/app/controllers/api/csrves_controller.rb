class Api::CsrvesController < Api::Base
  def show
    render json: {
      token: form_authenticity_token,
      status: :ok
    }
  end
end
