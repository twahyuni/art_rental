class CreateArtworks < ActiveRecord::Migration
  def change
    create_table :artworks do |t|
      t.string  :title
      t.string  :description
      t.string  :size
      t.string  :medium
      t.string  :status
      t.string  :barcode
      t.string  :category
      t.float   :rent_price
      t.date    :available_date
      t.string  :location
      t.integer :artist_id

      t.timestamps null: false
    end
  end
end
