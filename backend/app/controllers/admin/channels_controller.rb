class Admin::ChannelsController < Admin::Base
  before_action :set_channel, only: %i[show edit update destroy]

  def index
    @channels = Channel.all
  end

  def show; end

  def new
    @channel = Channel.new
  end

  def edit; end

  def create
    channel_id = channel_params[:channel_id].presence \
      || Youtube.get_channel_id(channel_params[:channel_link].split('/')[3])
    @channel = Channel.fetch_and_create!([channel_id])[0]

    if @channel.present?
      redirect_to admin_channels_path, notice: 'Channel が作成されました。'
    else
      render :new, status: :unprocessable_entity
    end
  end

  def update
    if @channel.update(channel_params)
      redirect_to admin_channels_path, notice: 'Channel が更新されました。'
    else
      render :edit, status: :unprocessable_entity
    end
  end

  def destroy
    @channel.destroy
    redirect_to admin_channels_path, notice: 'Channel が削除されました。'
  end

  private

  def set_channel
    @channel = Channel.find(params[:id])
  end

  def channel_params
    params.expect(channel: %i[channel_id name custom_name kind twitter_id channel_link])
  end
end
