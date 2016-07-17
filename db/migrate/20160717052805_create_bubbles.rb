class CreateBubbles < ActiveRecord::Migration
  def change
    create_table :bubbles do |t|
      t.string    :artist_bubble
      t.string    :rentee_bubble
      t.datetime  :artist_bubble_time_stamp
      t.datetime  :rentee_bubble_time_stamp
      t.integer   :reservation_id

      t.timestamps null: false
    end
  end
end
