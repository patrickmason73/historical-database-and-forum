class CommentsController < ApplicationController
    skip_before_action :authorize, only: :index

    def index
        render json: Comment.all, include: :user
    end

    def show
        comment = Comment.find(params[:id])
        render json: comment, include: :user
    end

    def create
        comment = Comment.create!(comment_params)
        render json: comment, status: :created
    end

    def destroy

    end

    def update

    end

    private

    def comment_params
        params.permit(:content, :user_id, :post_id)
    end
end
