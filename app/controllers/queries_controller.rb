class QueriesController < ApplicationController
  #skip_before_action :verify_authenticity_token

  # get one (by id)
  def find
    query = params["query"]
    filter = params["filter"]
    render json: Query.find(query, filter)
  end

end
