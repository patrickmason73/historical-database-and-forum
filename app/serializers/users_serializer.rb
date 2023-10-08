class UsersSerializer < ActiveModel::Serializer
  attributes :id, :username, :image_url, :bio, :display_name
  has_many :comments
  has_many :posts
end
