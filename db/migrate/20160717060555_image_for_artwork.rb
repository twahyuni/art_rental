class ImageForArtwork < ActiveRecord::Migration
  def change
    add_attachment :artworks, :artwork_image
  end
end
