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
        scope module: :song_items do
          resource :bulk, only: %i[new create]
        end
        resources :comments
      end
    end

    resource to: 'homes#show'
  end

  namespace :api, defaults: { format: :json } do
    resource :csrf, only: %i[show]
    resource :user, only: %i[show create]
    resource :session, only: %i[create destroy]

    resources :channels, only: %i[index show]
    resources :videos, only: %i[index show]
    resources :song_items, only: %i[index show]

    namespace :member do
      resources :song_items, only: %i[] do
        resources :song_diffs, only: %i[index create]
      end
    end
  end
end
