class Api::ReactionsController < ApplicationController
  def create
    params = reaction_params.merge({message_id: message_id, user_id: current_user.id})
    @reaction = Reaction.new(params)
    if @reaction.save
      Pusher.trigger('channel_' + @reaction.message.channel_id.to_s,
                     'receive_reaction',
                     { reaction: jsonify_reaction(@reaction) })
      render :show
    else
      render json: @reaction.errors.full_messages, status: 422
    end
  end

  def destroy
    @reaction = Reaction.find(reaction_id)
    if @reaction.destroy
      Pusher.trigger('channel_' + @reaction.message.channel_id.to_s,
                     'remove_reaction',
                     { reaction: jsonify_reaction(@reaction) })
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

  def jsonify_reaction(reaction)
    return JSON.parse(render_to_string(template: "api/reactions/_reaction.json.jbuilder",
      locals: { reaction: reaction }))
  end
end
