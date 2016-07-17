class ImageForArtists < ActiveRecord::Migration
  def change
    remove_column :artists, :image
    add_attachment :artists, :avatar
  end
end
