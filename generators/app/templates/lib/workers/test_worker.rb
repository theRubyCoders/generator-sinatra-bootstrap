class TestWorker
	include Sidekiq::Worker

	def perform(message)
    puts ">>>>>> #{message}"
	end
end
