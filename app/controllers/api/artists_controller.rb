class Api::ArtistsController < ApplicationController
  before_action :authenticate_artist!, except: [:index, :show]
  before_action :set_artist, only: [:show, :update, :destroy]

  def index
    @artists = Artist.all
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

  def update
    @artist.assign_attributes(artist_params)
    if @artist.save
      render 'show'
    else
      render json: @artist.errors.messages, status: 400
    end
  end

  def destroy
    @artist.destroy
  end

private

  def set_artist
    @artist = Artist.find_by_id(params[:id])
    if @artist.nil?
      render json: {message: "Cannot find arwork with ID #{params[:id]}"}
    end
  end

  def artist_params
    params.require(:artist).permit(:name, :email, :username, :nickname, :description, :website, :contact, :avatar)
  end

end
