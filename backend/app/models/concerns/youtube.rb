require 'google/apis/youtube_v3'
require 'open-uri'

class Youtube
  def initialize
    @service = Google::Apis::YoutubeV3::YouTubeService.new
    @service.key = ENV['GOOGLE_API_KEY']
  end

  def get_channel(channel_id)
    @service.list_channels('snippet', id: channel_id)
  end

  def get_video(video_id)
    @service.list_videos('liveStreamingDetails,snippet', id: video_id)
  end

  def get_chat_id(video_id)
    data = @service.list_videos('liveStreamingDetails', id: video_id)

    details = data.items[0].live_streaming_details
    return details.active_live_chat_id if details.respond_to? :active_live_chat_id

    None
  end

  def get_chat_messages_data(chat_id, page_token: nil)
    @service.list_live_chat_messages(chat_id, 'id,snippet,authorDetails', page_token:)
  end
end
