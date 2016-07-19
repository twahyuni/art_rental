class Reservation < ActiveRecord::Base
  has_many :bubbles

  belongs_to :rentee
  has_one :artwork
end
