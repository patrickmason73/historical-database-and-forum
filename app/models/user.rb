class User < ApplicationRecord
    has_secure_password
    has_many :comments
    has_many :posts, through: :comments

    validates :username, presence: true, uniqueness: true
    validates :bio, presence: true, length: { maximum: 500 }
    validates :display_name, presence: true, uniqueness: true
end
