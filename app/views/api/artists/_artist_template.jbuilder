json.merge! artist.attributes
json.artworks artist.artworks
json.description artist.description
json.avatar artist.avatar
json.contact artist.contact


json.artwork_image artist.artworks[0].artwork_image.url

json.artwork_image artist.artworks  do |q |
json.artwork_image q.artwork_image
end
