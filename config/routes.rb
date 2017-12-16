Rails.application.routes.draw do
  get 'users_controller/index'

  get 'users_controller/new'

  get 'users_controller/create'

  get 'home/index'

  Rails.application.routes.draw do
  
  resources :users, only: [] do
    get :validate_email, on: :collection
  end

  get 'home/index'

    devise_for :users, controllers: {
      sessions: 'users/sessions',
      confirmations:  'users/confirmations',
      registrations:  'users/registrations',
      passwords:      'users/passwords',
      invitations:    'users/invitations'
    }, sign_out_via: [:get, :delete]
  end

  root :to => 'home#index'
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
