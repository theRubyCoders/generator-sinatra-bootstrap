ENV['RACK_ENV'] ||= 'development'
require 'bundler'
Bundler.require :default, ENV['RACK_ENV'].to_sym

if ENV['RACK_ENV'] != 'production'
  require 'better_errors'
end

# Load models and workers
Dir.glob('./app/{models,routes}/**/*.rb').each { |file| require file }

class App < Sinatra::Base
  configure do
    register Sinatra::ActiveRecordExtension
    register Sinatra::Contrib
    register Sinatra::Partial

    use Rack::CommonLogger

    enable :sessions, :logging, :dump_errors, :raise_errors, :show_exceptions, :static
    enable :partial_underscores

    set :root, File.expand_path('..', File.dirname(__FILE__))
    set :partial_template_engine, :haml
    set :database_file, "config/database.yml"
    set :environments, %w{development test production}
    set :views, Proc.new { File.join(root, "app/views") }

    set :assets_prefix, %w(assets app/assets vendor/assets)
    set :assets_css_compressor, :sass
    set :assets_js_compressor, :uglifier
    register Sinatra::AssetPipeline

    config_file 'config/config.yml'

    if defined?(RailsAssets)
      RailsAssets.load_paths.each do |path|
        settings.sprockets.append_path(path)
      end
    end
  end

  configure :development do
    use BetterErrors::Middleware
    BetterErrors.application_root = root
  end

  configure :production do
  end
end
