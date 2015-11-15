require 'spec_helper'

describe API do
  def app
    API
  end

  describe 'GET /api/v1/hello' do
    it 'says hello to the world' do
      get '/api/v1/hello'
      expect(last_response.status).to eq(200)
      expect(JSON.parse(last_response.body)['hello']).to eq('world')
    end
  end
end
