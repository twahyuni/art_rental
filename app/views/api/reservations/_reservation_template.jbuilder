json.merge! reservation.attributes

artwork = reservation.artwork
json.artwork_url artwork.artwork_image(:medium)
json.artwork_title  artwork.title
json.artwork_medium artwork.medium
json.artwork_size   artwork.size

artist = artwork.artist
json.artwork_artist_name artist.name
json.artwork_artist_email artist.email