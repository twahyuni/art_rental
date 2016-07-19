Rails.application.routes.draw do
  mount_devise_token_auth_for 'Artist', at: 'auth'

  mount_devise_token_auth_for 'Rentee', at: 'rentee_auth'

  as :rentee do
    # Define routes for Rentee within this block.
  end
  post '/testing', to: 'statics#testing'

  root 'statics#home'

  get '/artist/signup' => 'auth#signup'
  get '/rentee/signup' => 'rentee_auth#signup'

  get '/artist/login' => 'auth#login'
  get '/rentee/login' => 'rentee_auth#login'

  get '/rentee_profile', to: 'statics#rentee_profile'
  get '/artist_profile', to: 'statics#artist_profile'

  namespace :api do
    resources :artists
    put '/artists/update_profile', to: 'artists#update'
    resources :rentees
    resources :artworks
    resources :bubbles
    resources :galleries
    post '/galleries/create_gallery_picture', to: 'galleries#create'
  end
end
