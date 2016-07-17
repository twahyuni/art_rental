class CreateReservations < ActiveRecord::Migration
  def change
    create_table :reservations do |t|
      t.date    :start_reservation_date
      t.date    :end_reservation_date
      t.integer :artwork_id
      t.integer :artist_id
      t.integer :rentee_id

      t.timestamps null: false
    end
  end
end
