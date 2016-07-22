json.merge! rentee.attributes
json.galleries rentee.galleries
json.avatar rentee.avatar
json.location rentee.location

json.location_picture rentee.galleries[0].location_picture.url

json.location_picture rentee.galleries  do |q |
json.location_picture q.location_picture
end


