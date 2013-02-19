Billtracker::Application.routes.draw do
  get "fetch", :to => 'fetch#index'
  post "fetch", :to => 'fetch#create', :as => 'new_fetch'

  resources :annotations


  resources :topics


  resources :bills do
    get 'fetch', :on => :member
    get 'annotated', :on => :member
  end


  authenticated :user do
    root :to => 'home#index'
  end
  root :to => "home#index"
  devise_for :users
  resources :users
end
