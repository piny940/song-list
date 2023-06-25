module WebDriver
  extend ActiveSupport::Concern

  def self.get_driver
    Selenium::WebDriver.logger.output = File.join('./', 'selenium.log')
    Selenium::WebDriver.logger.level = :warn

    options = Selenium::WebDriver::Chrome::Options.new
    options.add_argument('--headless')
    options.add_argument('--no-sandbox')
    options.add_argument('--disable-dev-shm-usage')
    options.add_argument('--window-size=1280x800')
    ua = 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/108.0.0.0 Safari/537.36'
    options.add_argument("--user-agent=#{ua}")

    Selenium::WebDriver.for :chrome, options:
  end
end
