class Api::ReservationsController < ApplicationController
  before_action :authenticate_rentee!, except: [:index, :show]
  before_action :set_reservation, only: [:show]

  def index
    @reservations = reservation.includes(:rentee).all
  end

  def show
  end

  def create
    @reservation = current_rentee.reservations.new(reservation_params)
    if @reservation.save
      render 'show'
    else
      render json: @reservation.errors.messages, status: 400
    end
  end

  def update
    @reservation.assign_attributes(reservation_params)
    if @reservation.save
      render 'show'
    else
      render json: @reservation.errors.messages, status: 400
    end
  end

  def destroy
    @reservation.destroy
  end

private

  def set_reservation
    @reservation = reservation.includes(:rentee).find_by_id(params[:id])
    if @reservation.nil?
      render json: {message: "Cannot find arwork with ID #{params[:id]}"}
    end
  end

  def reservation_params
    params.permit()
  end
end
end
