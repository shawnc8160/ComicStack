class IssuesController < ApplicationController
  #skip_before_action :verify_authenticity_token

  # post new issue
  def create
    thisIssue = params["issue"]
    render json: Issue.create(thisIssue)
  end

end
