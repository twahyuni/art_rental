class StaticsController < ApplicationController
  before_action :authenticate_artist!, only: [:artist_profile]
  before_action :authenticate_rentee!, only: [:rentee_profile]

  def home
  end

  def artist_profile
  end

  def rentee_profile
  end

end
