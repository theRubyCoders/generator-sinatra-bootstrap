$:.unshift File.expand_path('lib', File.dirname(__FILE__))

require_relative 'config/environment'

class Web < Sinatra::Base
  # Define routes
  register Sinatra::Web::Routing::Homepage

  # Errors
  not_found do
    haml :'404'
  end

  error do
    haml :'500'
  end

  run! if app_file == $0
end
