class StaticsController < ApplicationController
  before_action :authenticate_artist!, only: [:secret]
  def home
  end

  def secret
  end

  def artist_profile
  end

  def rentee_profile
  end

end
