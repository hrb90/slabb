class Api::MessagesController < ApplicationController
  def index
    @messages = Message.where(channel_id: channel_id).order(created_at: :desc).includes(:author)
    render :index
  end

  def create
    params = message_params.merge({channel_id: channel_id, author_id: current_user.id})
    @message = Message.new(params)
    if @message.save
      Pusher.trigger('channel_' + channel_id.to_s, 'new_message', { message: jsonify_message(@message) })
      Pusher.trigger('new_messages', 'new_message', { channelId: channel_id })
      render :show
    else
      render json: @message.errors.full_messages, status: 422
    end
  end

  def update
    @message = Message.find(message_id)
    if @message
      if @message.update(message_params)
        Pusher.trigger('channel_' + @message.channel_id.to_s, 'edit_message', { message: jsonify_message(@message) })
        render :show
      else
        render json: @message.errors.full_messages, status: 422
      end
    else
      render json: ["Couldn't find that message"], status: 404
    end
  end

  def destroy
    @message = Message.find(message_id)
    if @message.destroy
      Pusher.trigger('channel_' + @message.channel_id.to_s, 'delete_message', { id: @message.id })
      render :show
    else
      render json: ["Something went wrong"], status: 422
    end
  end

  private

  def channel_id
    params[:channel_id]
  end

  def message_id
    params[:id]
  end

  def message_params
    params.require(:message).permit(:content)
  end

  def jsonify_message(message)
    return {
      id: message.id,
      channel_id: message.channel_id,
      content: message.content,
      created_at: message.created_at,
      isEditing: false,
      author: {
        id: message.author.id,
        username: message.author.username
      }
    }
  end
end
