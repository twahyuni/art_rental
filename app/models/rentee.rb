class Rentee < ActiveRecord::Base
  # Include default devise modules.
  devise :database_authenticatable, :registerable,
          :recoverable, :rememberable, :trackable, :validatable,
          :omniauthable
  include DeviseTokenAuth::Concerns::User

  has_many :reservations

  has_attached_file :avatar, styles: {
    medium: "300x300>",
    thumb: "100x100>"
  }

  has_attached_file :exhibition_location_pictures, styles: {
    medium: "300x300>",
    thumb: "100x100>"
  }

  validates_attachment_content_type :avatar, content_type: /\Aimage\/.*\Z/
  validates_attachment_content_type :exhibition_location_pictures, content_type: /\Aimage\/.*\Z/

end
