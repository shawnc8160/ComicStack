class PeopleController < ApplicationController
  skip_before_action :verify_authenticity_token

  # get one (by id)
  def find
    render json: Query.find(params["url"])
  end

end
