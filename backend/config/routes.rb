# frozen_string_literal: true

Rails.application.routes.draw do
  devise_for :users
  root to: 'homes#show'

  namespace :admin do
    resources :channels do
      resources :videos
    end
    resource to: 'homes#show'
  end

  namespace :api, defaults: { format: :json } do
    resources :channels, only: %i[index show]
  end
end
