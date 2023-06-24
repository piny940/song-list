require 'google/apis/youtube_v3'
require 'open-uri'

module Youtube
  extend ActiveSupport::Concern

  def self.get_channels(channel_ids, page_token: nil)
    service.list_channels('snippet', id: channel_ids.join(','), page_token:)
  end

  CHANNEL_PAGE_ENDPOINT = 'https://www.youtube.com/'.freeze
  def self.get_channel_id(custom_url)
    Rails.logger.debug custom_url
    html = Nokogiri::HTML(URI.open("#{CHANNEL_PAGE_ENDPOINT}#{custom_url}"))
    id = html.at_css('meta[property="og:url"]')['content'].split('/')[-1]
    Rails.logger.debug id
    id
  end

  # 一度に取得できるのは50個まで
  def self.get_videos(video_ids, page_token: nil)
    service.list_videos('liveStreamingDetails,snippet', id: video_ids.join(','), page_token:)
  end

  RECENT_VIDEOS_ENDPOINT = 'https://www.youtube.com/feeds/videos.xml'.freeze
  def self.get_recent_video_ids(channel_id)
    html = Nokogiri::HTML.parse(URI.open("#{RECENT_VIDEOS_ENDPOINT}?channel_id=#{channel_id}"))
    html.css('feed entry id').map(&:text).pluck(9..)
  end

  def self.get_all_video_ids(custom_url)
    video_ids = Set.new
    counts = [nil, nil, nil, nil]
    driver = WebDriver.get_driver
    driver.get("https://www.youtube.com/#{custom_url}/streams")

    begin
      while video_ids.count != counts[0]
        counts.push(video_ids.count)
        counts.shift
        video_ids.merge(driver.find_elements(:css, '#video-title-link').map { |el| el.attribute('href').split('=')[1] })
        driver.action.scroll_by(0, 10_000).perform
      end
    ensure
      driver.quit
    end
    video_ids.to_a
  end

  def self.get_video_comments(video_id, page_token: nil)
    service.list_comment_threads('snippet,replies', video_id:, page_token:)
  end

  def self.get_chat_id(video_id)
    data = service.list_videos('liveStreamingDetails', id: video_id)

    details = data.items[0].live_streaming_details
    return details.active_live_chat_id if details.respond_to? :active_live_chat_id

    None
  end

  def self.get_chat_messages_data(chat_id, page_token: nil)
    service.list_live_chat_messages(chat_id, 'id,snippet,authorDetails', page_token:)
  end

  def self.service
    service = Google::Apis::YoutubeV3::YouTubeService.new
    service.key = ENV.fetch('GOOGLE_API_KEY', nil)
    service
  end
end
