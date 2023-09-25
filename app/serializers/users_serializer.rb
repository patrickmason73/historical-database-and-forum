class UsersSerializer < ActiveModel::Serializer
  attributes :id, :username, :image_url, :bio, :display_name
end
