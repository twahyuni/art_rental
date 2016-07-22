json.array! @artists do |artist|
  json.partial! 'artist_template', artist: artist


end
