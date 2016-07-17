class AddImageOnGallery < ActiveRecord::Migration
  def change
    add_attachment :galleries, :location_picture
  end
end
