Rails.application.routes.draw do
  mount_devise_token_auth_for 'Artist', at: 'auth'

  mount_devise_token_auth_for 'Rentee', at: 'rentee_auth'
  as :rentee do
    # Define routes for Rentee within this block.
  end

  root 'statics#home'

  devise_scope :rentee do
    get '/rentee/signup' => 'rentee_auth#signup'
  end
  get '/artist/signup' => 'auth#signup'

  get '/login' => 'auth#login'

  get '/secret' => 'statics#secret'
end
