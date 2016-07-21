class Reservation < ActiveRecord::Base
  has_many :bubbles

  belongs_to :rentee
  belongs_to :artwork

  validate :not_overlap

  private
  def not_overlap
    booking_start = Reservation.where.not("id= #{self.id}").where("artwork_id = #{self.artwork_id}").where("? >= start_reservation_date AND ? <= end_reservation_date", start_reservation_date, start_reservation_date).count > 0

    booking_end = Reservation.where.not("id= #{self.id}").where("artwork_id = #{self.artwork_id}").where("? >= start_reservation_date AND ? <= start_reservation_date", end_reservation_date, end_reservation_date).count > 0

    if booking_start
      errors.add(:start_reservation_date, "Date is overlapping with existing entries")
    elsif booking_end
      errors.add(:end_reservation_date, "Date is overlapping with existing entries")
    end

    # errors.add(:start_reservation_date, "Date is overlapping with existing entries") unless (Reservation.where("artwork_id = #{self.artwork_id}").where("? >= start_reservation_date AND ? <= end_reservation_date", start_reservation_date, start_reservation_date).count == 0)
    # errors.add(:end_reservation_date, "Date is overlapping with existing entries") unless (Reservation.where("artwork_id = #{self.artwork_id}").where("? >= start_reservation_date AND ? <= start_reservation_date", start_reservation_date, end_reservation_date).count == 0)
  end
end



# && Reservation.where("id= #{self.id}")