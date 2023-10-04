class PostsSerializer < ActiveModel::Serializer
  attributes :id, :title, :content, :img_url
  validates :title, presence: true, length: { maximum: 70 }
  validates :content, presence: true, length: { minimum: 100 }
end
