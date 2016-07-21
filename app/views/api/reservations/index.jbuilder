json.array! @reservations do |reservation|
  json.partial! 'reservation_template', reservation: reservation
end
