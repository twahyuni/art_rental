class Api::RenteesController < ApplicationController
  before_action :authenticate_rentee!, except: [:index, :show]
  before_action :set_rentee, only: [:show]

  def index
    @rentees = Rentee.all
  end

  def show
  end

  def create
    @rentee = current_rentee.new(rentee_params)
    if @rentee.save
      render 'show'
    else
      render json: @rentee.errors.messages, status: 400
    end
  end

  def update
    puts rentee_params
    current_rentee.assign_attributes(rentee_params)
    if current_rentee.save
      render json: {current_rentee: current_rentee, avatar: current_rentee.avatar.url(:medium)}
    else
      render json: {errors: current_rentee.errors.messages}, status: 400
    end
  end

  def destroy
    current_rentee.destroy
  end

private

  def set_rentee
    @rentee = Rentee.find_by_id(params[:id])
    if @rentee.nil?
      render json: {message: "Cannot find arwork with ID #{params[:id]}"}
    end
  end

  def rentee_params
    params.permit(:name, :email, :username, :nickname, :description, :website, :contact, :location, :business_type, :avatar)
  end

end
