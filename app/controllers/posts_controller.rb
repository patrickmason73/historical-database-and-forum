class PostsController < ApplicationController
 skip_before_action :authorize, only: [:index, :show]
    def index
        render json: Post.all, include: [:comments, :users]
    end

    def show
        post = Post.find(params[:id])
        render json: post, include: [:comments, :users]
    end

    def create
        post = Post.create!(post_params)
        render json: post, include: [:comments, :users], status: :created
    end

    def search
        posts = Post.all.filter { |post| post.title.capitalize.include?(params[:title].capitalize) }
        render json: posts
    end

    # def top_three
    #     users = User.includes(:comments, :posts).all
    #     sorted_users = users.sort_by { |user| -user.comments.length }
    #     three_users = sorted_users[0..2]
    #     posts = three_users.map { |user| user.posts }
    #     unique_posts = posts.flatten(1).uniq 
    #     render json: unique_posts
    # end

    private

    def post_params
        params.permit(:title, :content, :img_url)
    end
end
