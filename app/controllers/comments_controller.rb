class CommentsController < ApplicationController
    skip_before_action :authorize, only: :index

    def index
        render json: Comment.all, include: [:user, :post, :replies]
    end

    def show
        comment = Comment.find(params[:id])
        render json: comment, include: [:user, :post, :replies]
    end

    def create
        comment = Comment.create!(comment_params)
        render json: comment, include: [:user, :post, :replies] ,status: :created
    end

    def destroy
        comment = @current_user.comments.find(params[:id])
        comment.destroy!
        head :no_content
    end

    def update
        comment = @current_user.comments.find(params[:id])
        comment.update!(comment_params)
        render json: comment, status: :accepted
    end

    private

    def comment_params
        params.permit(:content, :user_id, :post_id, :parent_comment_id, :replies)
    end
end
