class OwnsController < ApplicationController
  #skip_before_action :verify_authenticity_token

  # post new owner linking table
  def create
    render json: Own.create(params["own"])
  end

end
