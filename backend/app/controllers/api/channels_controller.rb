class Api::ChannelsController < Api::Base
  before_action :set_channel, only: %i[show]
  def index
    @channels = Channel.kind_published.order('random()')
  end

  def show; end

  private

  def set_channel
    @channel = Channel.kind_published.find(params[:id])
  end
end
