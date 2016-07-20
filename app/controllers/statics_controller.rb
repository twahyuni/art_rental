class StaticsController < ApplicationController
  before_action :authenticate_artist!, only: [:artist_profile, :artist_inbox]
  before_action :authenticate_rentee!, only: [:rentee_profile, :rentee_inbox]

  def home
  end

  def browse
  end

  def artist_profile
  end

  def rentee_profile
  end

  def searched_artist_profile
  end

  def searched_rentee_profile
  end

  def search_category
  end

  def artist_inbox
  end

  def rentee_inbox
  end
end
