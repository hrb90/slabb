class Api::ChannelsController < ApplicationController
  def index
    @channels = Channel.all
    render :index
  end

  def create
    @channel = Channel.new(channel_params)
    if @channel.save
      render :show
    else
      render json: @channel.errors.full_messages, status: 422
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
end
