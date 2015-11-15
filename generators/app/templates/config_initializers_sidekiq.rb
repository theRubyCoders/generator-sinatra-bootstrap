require 'sidekiq/api'
require 'sidekiq/web'

Sidekiq.configure_client do |config|
  #config.redis = { url: '{{URL}}' }
end

Sidekiq.configure_server do |config|
  #config.redis = { url: '{{URL}}' }
end
