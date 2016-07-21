class Api::ReservationsController < ApplicationController
  before_action :authenticate_rentee!, except: [:index, :show, :rentee_index]
  before_action :set_reservation, only: [:show, :update, :destroy]

  def index
    @reservations = Reservation.joins(:rentee, {artwork: :artist}).includes(:rentee, {artwork: :artist}).all
  end

  def rentee_index
    @reservations = current_rentee.reservations
    render 'index'
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

    head 200
  end

private

  def set_reservation
    @reservation = Reservation.joins(:rentee, {artwork: :artist}).includes(:rentee, {artwork: :artist}).find_by_id(params[:id])
    if @reservation.nil?
      render json: {message: "Cannot find reservation with ID #{params[:id]}"}
    end
  end

  def reservation_params
    params.permit(:start_reservation_date, :end_reservation_date, :artist_id, :artwork_id, :id)
  end
end

