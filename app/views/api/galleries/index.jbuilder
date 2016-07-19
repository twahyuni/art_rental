json.array! @galleries do |gallery|
  json.partial! 'gallery_template', gallery: gallery
end
