class ApplicationController < ActionController::Base
  include DeviseTokenAuth::Concerns::SetUserByToken
  # Prevent CSRF attacks by raising an exception.
  # For APIs, you may want to use :null_session instead.
  protect_from_forgery with: :null_session

  before_action :configure_permitted_parameters, if: :devise_controller?
  before_action :get_current_artist
  before_action :get_current_rentee

  def authenticate_artist!
    render json: {message: "Unauthorize"} if current_artist.nil?
  end

  def authenticate_rentee!
    render json: {message: "Unauthorize"} if current_rentee.nil?
  end

  def get_current_artist
    return nil unless cookies[:authHeaders]
    auth_headers = JSON.parse cookies[:authHeaders]

    expiration_datetime = DateTime.strptime(auth_headers["expiry"], "%s")
    current_artist = Artist.find_by(uid: auth_headers["uid"])

    if current_artist &&
       current_artist.tokens.has_key?(auth_headers["client"]) &&
       expiration_datetime > DateTime.now

      @current_artist = current_artist
    end
    @current_artist
  end

  def get_current_rentee
    return nil unless cookies[:authHeaders]
    auth_headers = JSON.parse cookies[:authHeaders]

    puts auth_headers
    expiration_datetime = DateTime.strptime(auth_headers["expiry"], "%s")
    current_rentee = Rentee.find_by(uid: auth_headers["uid"])

    if current_rentee &&
       current_rentee.tokens.has_key?(auth_headers["client"]) &&
       expiration_datetime > DateTime.now

      @current_rentee = current_rentee
    end
    @current_rentee
  end

protected

  def configure_permitted_parameters
      # devise_parameter_sanitizer.permit(:sign_up, keys: [:config_name])
      # ADD PERMITS FOR ARTIST AND RENTEE
      devise_parameter_sanitizer.permit(:account_update, keys: [:name, :email, :username, :nickname, :description, :website, :contact, :avatar])
  end
end


