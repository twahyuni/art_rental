class Reservation < ActiveRecord::Base
  has_many :bubbles

  belongs_to :rentee
  has_one :artwork

  validates :overlap

private

  def overlap
    booking_start = BookingDate.where("artwork_id = #{self.artwork_id}").where("start_reservation_date > #{self.start_reservation_date} AND end_reservation_date < #{self.start_reservation_date}")

    booking_end = BookingDate.where("artwork_id = #{self.artwork_id}").where("start_reservation_date > #{self.end_reservation_date} AND end_reservation_date < #{self.end_reservation_date}")

    if booking_start
      errors.add(:start_date, message: "Date is overlapping with existing entries")
    end

    if booking_end
      errors.add(:end_date, message: "Date is overlapping with existing entries")
    end
  end
end
