class Reservation < ActiveRecord::Base
  has_many :bubbles

  belongs_to :rentee
  belongs_to :artwork

  # validate :not_overlap

  private
  def not_overlap
    booking_start = errors.add(:start_reservation_date, message: "Date is overlapping with existing entries") unless (Reservation.where("artwork_id = #{self.artwork_id}").where("? >= start_reservation_date AND ? <= end_reservation_date",
                                                            start_reservation_date, start_reservation_date).count == 0) && Reservation..where.not("id= #{self.id}")
    booking_end = errors.add(:end_reservation_date, message: "Date is overlapping with existing entries") unless (Reservation.where("artwork_id = #{self.artwork_id}").where("? >= start_reservation_date AND ? <= start_reservation_date",
                                                            start_reservation_date, end_reservation_date).count == 0) && Reservation..where.not("id= #{self.id}")
  end
end


