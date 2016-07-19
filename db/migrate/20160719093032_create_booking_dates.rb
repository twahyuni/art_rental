class CreateBookingDates < ActiveRecord::Migration
  def change
    create_table :booking_dates do |t|
      t.date     "available_start_date"
      t.date     "available_end_date"
      t.integer  "artwork_id"

      t.timestamps null: false
    end
  end
end
