require File.dirname(__FILE__) + '/app'

# Load initializers
Dir[File.dirname(__FILE__) + '/config/initializers/*.rb'].each {|file| require file }

<% if (addBackgroundJobs){ %>
run Rack::URLMap.new('/' => App, '/sidekiq' => Sidekiq::Web)
<% } else { %>
run Rack::URLMap.new('/' => App)
<% } %>
