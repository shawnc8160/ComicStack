class CharactersController < ApplicationController
  #skip_before_action :verify_authenticity_token

  # post new character
  def create
    thisChar = params["character"]
    render json: Character.create(thisChar)
  end

end
