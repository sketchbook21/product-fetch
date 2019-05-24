Rails.application.routes.default_url_options[:host] = 'immense-scrubland-92013.herokuapp.com'

Rails.application.routes.draw do
  root 'search#index'
  devise_for :users

  
  resources :search, only: [:index]
  namespace :api do
    namespace :v1 do
      resources :search, only: [:create]
    end
  end

  get '*path' => 'search#index'
end
