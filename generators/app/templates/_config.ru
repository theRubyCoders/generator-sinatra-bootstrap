require File.dirname(__FILE__) + '/app'

# Load initializers
Dir[File.dirname(__FILE__) + '/config/initializers/*.rb'].each {|file| require file }

<% if (addApi){ %>
  <% if (addBackgroundJobs){ %>
  run Rack::Cascade.new [API, Rack::URLMap.new('/' => Web, '/sidekiq' => Sidekiq::Web)]
  <% } else { %>
  run Rack::Cascade.new [API, Rack::URLMap.new('/' => Web)]
  <% } %>
<% } else { %>
  <% if (addBackgroundJobs){ %>
  run Rack::URLMap.new('/' => Web, '/sidekiq' => Sidekiq::Web)
  <% } else { %>
  run Rack::URLMap.new('/' => Web)
  <% } %>
<% } %>
