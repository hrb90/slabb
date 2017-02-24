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
    @channel = Channel.includes([:subscribers, messages: [:author]]).find(params[:id])
    render :show
  end

  def update
    @channel = Channel.includes(:messages).find(params[:id])
    if @channel && @channel.update(channel_params)
      jsonify_channel = JSON.parse(render_to_string(template: "api/channels/show.json.jbuilder"))
      unless channel_params[:topic].nil?
        Pusher.trigger('channel_' + params[:id].to_s, 'update_topic', { topic: channel_params[:topic] })
      end
      render :show
    else
      render json: @channel.errors.full_messages, status: 422
    end
  end

  def destroy
    @channel = Channel.find(params[:id])
    if @channel.destroy
      render json: { id: params[:id] }
    else
      render json: ["Something went wrong"], status: 422
    end
  end

  def subscribe
    duplicate_sub = Subscription.find_by(user_id: current_user.id, channel_id: params[:channel_id])
    unless duplicate_sub.nil?
      @channel = duplicate_sub.channel
      render :show
    else
      subscription = Subscription.new({user_id: current_user.id, channel_id: params[:channel_id]})
      if subscription.save
        @channel = subscription.channel
        Pusher.trigger('channel_' + params[:channel_id].to_s, 'receive_subscriber', { user: current_user })
        render :show
      else
        render json: subscription.errors.full_messages, status: 422
      end
    end
  end

  def unsubscribe
    @subscription = Subscription.find_by({user_id: current_user.id, channel_id: params[:channel_id]})
    if @subscription
      if @subscription.destroy
        Pusher.trigger('channel_' + params[:channel_id].to_s, 'remove_subscriber', { user: current_user })
        render "api/subscriptions/show"
      else
        render json: subscription.errors.full_messages, status: 422
      end
    else
      render json: ["You are not subscribed to this channel"], status: 422
    end
  end

  def subscriptions
    @channels = current_user.subscribed_channels
    render :index
  end

  private

  def channel_params
    params.require(:channel).permit(:name, :description, :topic, :channel_type, dm_user_ids: [])
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
