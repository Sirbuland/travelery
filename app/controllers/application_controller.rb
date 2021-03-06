class ApplicationController < ActionController::Base
  protect_from_forgery with: :exception

  before_action :configure_permitted_parameters, if: :devise_controller?
  before_action :current_agency, if: :user_signed_in?

  protected

  helper_method :current_agency

  def configure_permitted_parameters
    devise_parameter_sanitizer.permit(:sign_up) do |user_params|
      user_params.permit(:first_name, :last_name, :nic, :email, :password, :cell_number, :office_phone_number, 
          agency_users_attributes: [
            agency_attributes: [
              :name, :subdomain, :number_of_employees,
              locations_attributes: [
                :name, :phone_number, :address, :city, :state, :country, :zip
              ]
            ]
          ]
        )
    end
  end

  def current_agency
    @current_agency ||= current_user.agencies.first
  end

  def after_sign_in_path_for(resource)
    dashboard_path
  end

end
