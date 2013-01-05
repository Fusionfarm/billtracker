Billtracker::Application.routes.draw do
  resources :annotations


  resources :topics


  resources :bills do
    get 'fetch', :on => :member
  end


  authenticated :user do
    root :to => 'home#index'
  end
  root :to => "home#index"
  devise_for :users
  resources :users
end
