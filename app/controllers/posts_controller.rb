class PostsController < ApplicationController
 skip_before_action :authorize, only: :index
    def index
        render json: Post.all, include: :comments
    end

    def show
        post = Post.find(params(:id))
        render json: post, include: :comments
    end

    def create
        post = Post.create(post_params)
        render json: post, status: :created
    end

    private

    def post_params
        params.permit(:title, :content, :img_url)
    end
end
