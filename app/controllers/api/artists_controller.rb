class Api::ArtistsController < ApplicationController
  before_action :authenticate_artist!, except: [:index, :show, :searched_artist_profile]
  before_action :set_artist, only: [:show]

  def index
    @artists = Artist.includes(:artworks).all
  end

  def show
  end

  def create
    @artist = current_artist.new(artist_params)
    if @artist.save
      render 'show'
    else
      render json: @artist.errors.messages, status: 400
    end
  end

  def  searched_artist_profile

  end

  def update
    puts artist_params
    current_artist.assign_attributes(artist_params)
    if current_artist.save
      # render 'show'
      render json: {current_artist: current_artist, avatar: current_artist.avatar.url(:medium)}
    else
      render json: {errors: current_artist.errors.messages}, status: 400
    end
  end

  def destroy
    current_artist.destroy
  end

private

  def set_artist
    @artist = Artist.includes(:artworks).find_by_id(params[:id])
    if @artist.nil?
      render json: {message: "Cannot find arwork with ID #{params[:id]}"}
    end
  end

  def artist_params
    params.permit(:name, :email, :username, :nickname, :description, :website, :contact, :avatar)
  end

end
