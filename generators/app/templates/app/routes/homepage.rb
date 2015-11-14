module Sinatra
  module App
    module Routing
      module Homepage
        def self.registered(app)
          app.get  '/' do
            haml :'homepage/index'
          end
        end
      end
    end
  end
end
