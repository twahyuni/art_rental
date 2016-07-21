class Artwork < ActiveRecord::Base
  belongs_to :artist
  has_many :reservations
  has_many :booking_dates

  has_attached_file :artwork_image, styles: {
    medium: "300x300>",
    thumb: "100x100>"
  }

  validates_attachment_content_type :artwork_image, content_type: /\Aimage\/.*\Z/
end
