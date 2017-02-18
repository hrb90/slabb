Rails.application.routes.draw do
  root to: "static_pages#root"

  namespace :api, defaults: { format: :json } do
    resources :users, only: [:create, :index]
    resource :session, only: [:create, :destroy]
    resources :channels, only: [:index, :create, :show, :update, :destroy] do
      get 'subscribe', to: "channels#subscribe"
      get 'unsubscribe', to: "channels#unsubscribe"
      resources :messages, only: [:index, :create]
    end
    resources :messages, only: [:update, :destroy]
    get 'subscriptions', to: "channels#subscriptions"
  end
end
