require "test_helper"

class Admin::ChannelsControllerTest < ActionDispatch::IntegrationTest
  setup do
    @admin_channel = admin_channels(:one)
  end

  test "should get index" do
    get admin_channels_url
    assert_response :success
  end

  test "should get new" do
    get new_admin_channel_url
    assert_response :success
  end

  test "should create admin_channel" do
    assert_difference("Admin::Channel.count") do
      post admin_channels_url, params: { admin_channel: { channel_id: @admin_channel.channel_id, name: @admin_channel.name, response_json: @admin_channel.response_json, twitter_id: @admin_channel.twitter_id } }
    end

    assert_redirected_to admin_channel_url(Admin::Channel.last)
  end

  test "should show admin_channel" do
    get admin_channel_url(@admin_channel)
    assert_response :success
  end

  test "should get edit" do
    get edit_admin_channel_url(@admin_channel)
    assert_response :success
  end

  test "should update admin_channel" do
    patch admin_channel_url(@admin_channel), params: { admin_channel: { channel_id: @admin_channel.channel_id, name: @admin_channel.name, response_json: @admin_channel.response_json, twitter_id: @admin_channel.twitter_id } }
    assert_redirected_to admin_channel_url(@admin_channel)
  end

  test "should destroy admin_channel" do
    assert_difference("Admin::Channel.count", -1) do
      delete admin_channel_url(@admin_channel)
    end

    assert_redirected_to admin_channels_url
  end
end
