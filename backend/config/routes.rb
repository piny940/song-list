# frozen_string_literal: true

Rails.application.routes.draw do
  devise_for :users
  root to: 'homes#show'

  namespace :admin do
    resources :channels
    resources :videos do
      scope module: :videos do
        resources :song_items do
          resources :song_diffs
        end
      end
    end
    
    resource to: 'homes#show'
  end

  namespace :api, defaults: { format: :json } do
    resources :channels, only: %i[index show] do
      resources :videos, only: %i[index show]
    end
  end
end
