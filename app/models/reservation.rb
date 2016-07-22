class Reservation < ActiveRecord::Base
  has_many :bubbles

  belongs_to :rentee
  belongs_to :artwork

  validate :not_overlap_create, on: :create
  validate :not_overlap_update, on: :update

  private

  def not_overlap_create
    booking_start = Reservation.where("artwork_id = #{self.artwork_id}").where("? >= start_reservation_date AND ? <= end_reservation_date", start_reservation_date, start_reservation_date).count > 0

    booking_end = Reservation.where("artwork_id = #{self.artwork_id}").where("? >= start_reservation_date AND ? <= start_reservation_date", end_reservation_date, end_reservation_date).count > 0

    if booking_start
      errors.add(:start_reservation_date, "Date is overlapping with existing entries")
    elsif booking_end
      errors.add(:end_reservation_date, "Date is overlapping with existing entries")
    end
  end

  def not_overlap_update
    booking_start = Reservation.where.not("id= #{self.id}").where("artwork_id = #{self.artwork_id}").where("? >= start_reservation_date AND ? <= end_reservation_date", start_reservation_date, start_reservation_date).count > 0

    booking_end = Reservation.where.not("id= #{self.id}").where("artwork_id = #{self.artwork_id}").where("? >= start_reservation_date AND ? <= start_reservation_date", end_reservation_date, end_reservation_date).count > 0

    if booking_start
      errors.add(:start_reservation_date, "Date is overlapping with existing entries")
    elsif booking_end
      errors.add(:end_reservation_date, "Date is overlapping with existing entries")
    end
  end
end

