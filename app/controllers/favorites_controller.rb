class FavoritesController < ApplicationController
  #skip_before_action :verify_authenticity_token

  # post new favorite linking table
  def create
    render json: Favorite.create(params["favorite"])
  end

end
