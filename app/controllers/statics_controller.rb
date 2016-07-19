class StaticsController < ApplicationController
  before_action :authenticate_artist!, only: [:artist_profile, :testing]
  before_action :authenticate_rentee!, only: [:rentee_profile]

  def home
  end

  def artist_profile
  end

  def rentee_profile
  end

  def searched_artist_profile
  end

  def searched_rentee_profile
  end
end
