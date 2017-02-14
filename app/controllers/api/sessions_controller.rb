class Api::SessionsController < ApplicationController
  def create
    @user = User.find_by_credentials(user_params[:username], user_params[:password])
    if @user
      log_in!(@user)
      render "api/users/show"
    else
      render json: ["Incorrect username or password"], status: 401
    end
  end

  def destroy
    if logged_in?
      log_out!
      render json: {}
    else
      render json: ["You are not logged in"], status: 404
    end
  end
end
