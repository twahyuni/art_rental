Rails.application.routes.draw do
  mount_devise_token_auth_for 'Artist', at: 'auth'

  mount_devise_token_auth_for 'Rentee', at: 'rentee_auth'

  as :rentee do
    # Define routes for Rentee within this block.
  end

  root 'statics#home'

  get '/browse', to: 'statics#browse'

  get '/artist/signup', to: 'auth#signup'
  get '/rentee/signup', to: 'rentee_auth#signup'

  get '/artist/login', to: 'auth#login'
  get '/rentee/login', to: 'rentee_auth#login'

  get '/artist_profile', to: 'statics#artist_profile'
  get '/rentee_profile', to: 'statics#rentee_profile'


  get '/artist_profile', to: 'statics#searched_artist_profile'
  get '/artist_profile', to: 'statics#searched_rentee_profile'
  # get '/search/category', to: 'statics#search_category'


  get '/artist/inbox', to: 'statics#artist_inbox'
  get '/rentee/inbox', to: 'statics#rentee_inbox'

  namespace :api do
    resources :artists
    put '/artists/update_profile', to: 'artists#update'

    resources :rentees

    resources :artworks
    post '/artists/create_artwork', to: 'artworks#create'
    put '/artists/edit_artwork/:id', to: 'artworks#update'
    get '/artworks/result/:category', to: 'artworks#search_category'
    get '/artist/artworks', to: 'artworks#artist_index'

    resources :bubbles

    resources :galleries
    post '/galleries/create_gallery_picture', to: 'galleries#create'
    get '/rentee/galleries', to: 'galleries#rentee_index'

    resources :reservations
    get '/rentee/reservations', to: 'reservations#rentee_index'
  end
end
