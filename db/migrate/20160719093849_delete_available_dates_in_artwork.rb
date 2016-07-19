class DeleteAvailableDatesInArtwork < ActiveRecord::Migration
  def change
    remove_column :artworks, :available_date
  end
end
