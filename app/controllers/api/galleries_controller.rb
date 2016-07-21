class Api::GalleriesController < ApplicationController
  before_action :authenticate_rentee!, except: [:index, :show]
  before_action :set_gallery, only: [:show, :update, :destroy]

  def index
    @galleries = Gallery.includes(:rentee).all
  end

  def rentee_index
    @galleries = current_rentee.galleries.all
    render 'index'
  end

  def show
  end

  def create
    @gallery = current_rentee.galleries.new(gallery_params)
    if @gallery.save
      render 'show'
    else
      render json: {errors: @gallery.errors.messages }, status: 400
    end
  end

  def update
    @gallery.assign_attributes(gallery_params)
    if @gallery.save
      render 'show'
    else
      render json: {errors: @gallery.errors.messages }, status: 400
    end
  end


  def destroy
    @gallery.destroy
  end

private

  def set_gallery
    @gallery = Gallery.includes(:rentee).find_by_id(params[:id])
    if @gallery.nil?
      render json: {message: "Cannot find arwork with ID #{params[:id]}"}
    end
  end

  def gallery_params
    params.permit(:title, :description, :location, :rentee_id, :location_picture)
  end
end
