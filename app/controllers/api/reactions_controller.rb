class Api::ReactionsController < ApplicationController
  def create
    params = reaction_params.merge({message_id: message_id, user_id: current_user.id})
    @reaction = Reaction.new(params)
    if @reaction.save
      render :show
    else
      render json: @reaction.errors.full_messages, status: 422
    end
  end

  def destroy
    @reaction = Reaction.find(reaction_id)
    if @reaction.destroy
      render :show
    else
      render json: ["Something went wrong"], status: 422
    end

  end

  private

  def message_id
    params[:message_id]
  end

  def reaction_id
    params[:id]
  end

  def reaction_params
    params.require(:reaction).permit(:emoji_name)
  end
end
