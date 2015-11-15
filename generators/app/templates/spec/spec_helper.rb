ENV['RACK_ENV'] = 'test'

require 'rspec'
require 'rack/test'
require_relative File.join('..', 'app')

Dir[('./spec/support/**/*.rb')].each { |f| require f }

RSpec.configure do |config|
  include Rack::Test::Methods

  def app
    Web
  end
end
