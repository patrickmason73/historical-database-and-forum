class PostsSerializer < ActiveModel::Serializer
  attributes :id, :title, :content, :img_url
  has_many :comments
  has_many :users

end
