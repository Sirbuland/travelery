class UsersController < ApplicationController
  def index
  end

  def new
  end

  def create
  end

  def validate_email
    email = params[:email].downcase
    email_presence = User.exists?(email: email)
    respond_to do |format|
      format.json { render json: !email_presence }
    end
  end
end
