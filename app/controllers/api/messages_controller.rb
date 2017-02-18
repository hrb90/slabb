class Api::MessagesController < ApplicationController
  def index
    @messages = Message.where(channel_id: channel_id).order(created_at: :desc).includes(:author)
    render :index
  end

  def create
    params = message_params.merge({channel_id: channel_id, author_id: current_user.id})
    @message = Message.new(params)
    if @message.save
      render :show
    else
      render json: @message.errors.full_messages, status: 422
    end
  end

  def update
    @message = Message.find(message_id)
    if @message
      if @message.update(message_params)
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
end
