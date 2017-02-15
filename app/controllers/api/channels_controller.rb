class Api::ChannelsController < ApplicationController
  def index
    @channels = Channel.where(channel_type: "channel")
    render :index
  end

  def create
    @channel = Channel.new(channel_params)
    if @channel.channel_type == "dm"
      duplicate_channel = Channel.find_by_dm_hash(@channel.dm_hash)
      unless duplicate_channel.nil?
        @channel = duplicate_channel
        render :show
      else
        save_and_show(@channel)
      end
    else
      save_and_show(@channel)
    end
  end

  def show
    @channel = Channel.find(params[:id])
    render :show
  end

  def update
    @channel = Channel.find(params[:id])
    if @channel.update(channel_params)
      render :show
    else
      render json: @channel.errors.full_messages, status: 422
    end
  end

  def destroy

  end

  private

  def channel_params
    params.require(:channel).permit(:name, :description, :topic, :channel_type, dm_user_ids: [])
  end

  def subscription_params
    params.require(:subscription).permit(:user_id)
  end

  def save_and_show(channel)
    @channel = channel
    if @channel.save
      render :show
    else
      render json: @channel.errors.full_messages, status: 422
    end
  end
end
