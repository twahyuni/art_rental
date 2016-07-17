class DropLocationPicturesRentee < ActiveRecord::Migration
  def change
    remove_attachment :rentees, :exhibition_location_pictures
  end
end
