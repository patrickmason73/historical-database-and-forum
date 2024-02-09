class CommentsSerializer < ActiveModel::Serializer
  attributes :id, :content, :user_id, :post_id, :parent_comment_id, :replies
  belongs_to :user
  belongs_to :post
end
