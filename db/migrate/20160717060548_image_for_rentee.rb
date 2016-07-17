class ImageForRentee < ActiveRecord::Migration
  def change
    remove_column :rentees, :image
    add_attachment :rentees, :avatar
    add_attachment :rentees, :exhibition_location_pictures
  end
end
