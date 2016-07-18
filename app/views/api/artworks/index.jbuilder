json.array! @artworks do |artwork|
  json.partial! 'artwork_template', artwork: artwork
end
