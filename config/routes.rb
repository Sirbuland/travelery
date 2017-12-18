Rails.application.routes.draw do
  

  get '/dashboard' => 'agencies#dashboard', as: 'dashboard'

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

  resources :agencies, only: [] do
    get :dashboard
  end

  root :to => 'home#index'

end
