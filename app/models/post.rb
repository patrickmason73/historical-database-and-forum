class Post < ApplicationRecord
    has_many :comments
    has_many :users, through: :comments

    validates :title, presence: true, length: { maximum: 70 }
    validates :content, presence: true, length: { minimum: 100 }
    validates :img_url, presence: true, format: {with: /\.(png|jpg)\Z/i}
end
