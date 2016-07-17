class StaticsController < ApplicationController
  before_action :authenticate_artist!, only: [:secret]
  def home
  end

  def secret
  end
end
