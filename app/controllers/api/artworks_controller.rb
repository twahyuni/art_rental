class Api::ArtworksController < ApplicationController
  before_action :authenticate_artist!, except: [:index, :show]
  before_action :set_artwork, only: [:show, :update, :destroy]

  def index
    @artworks = Artwork.includes(:artist).all
  end

  def show
  end

  def create
    @artwork = current_artist.artworks.new(post_params)
    if @artwork.save
      render 'show'
    else
      render json: @artwork.errors.messages, status: 400
    end
  end

  def update
    @artwork.assign_attributes(post_params)
    if @artwork.save
      render 'show'
    else
      render json: @artwork.errors.messages, status: 400
    end
  end

  def destroy
    @artwork.destroy
  end

private

  def set_artwork
    @artwork = Artwork.includes(:artist).find_by_id(params[:id])
    if @artwork.nil?
      render json: {message: "Cannot find arwork with ID #{params[:id]}"}
    end
  end

  def artwork_params
    params.require(:artwork).permit(:title, :description, :size, :medium, :status, :barcode, :category, :rent_price, :available_date, :location, :artist_id, :artwork_image_file_name)
  end
end
