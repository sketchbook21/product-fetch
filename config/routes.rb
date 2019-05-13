Rails.application.routes.draw do
  root 'search#index'
  devise_for :users
  
  resources :search, only: [:index]
end
