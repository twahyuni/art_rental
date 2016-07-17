class Gallery < ActiveRecord::Base
  belongs_to :rentee

  has_attached_file :location_picture, styles: {
    medium: "300x300>",
    thumb: "100x100>"
  }

  validates_attachment_content_type :location_picture, content_type: /\Aimage\/.*\Z/
end
