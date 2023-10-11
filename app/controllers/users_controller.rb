class UsersController < ApplicationController
    skip_before_action :authorize, only: [:create, :index]

    def index
        render json: User.all, include: [:posts, :comments]
    end

    def show
        render json: @current_user, include: [:posts, :comments]
    end
    
    def create
        user = User.create!(user_params)
        session[:user_id] = user.id
        render json: user, status: :created
    end

    private

    def user_params
        params.permit(:username, :password, :password_confirmation, :img_url, :bio, :display_name)
    end
end
