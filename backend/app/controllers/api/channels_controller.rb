class Api::ChannelsController < Api::Base
  before_action :set_channel, only: %i[show]
  def index
    @channels = Channel.all
  end

  def show; end

  private

  def set_channel
    @channel = Channel.find(params[:id])
  end
end
