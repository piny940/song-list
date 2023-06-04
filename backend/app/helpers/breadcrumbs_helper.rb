module BreadcrumbsHelper
  def breadcrumbs(controller_name, action_name)
    current_page_name = "#{controller_name}##{action_name}"
    current_page_name = current_page_name.gsub(%r{^sample/}, '')
    list = breadcrumbs_tree.find { |b_list| b_list.include?(current_page_name) }
    list && list[0..list.index(current_page_name)].map { |name| breadcrumbs_url(name) }
  end

  private

  def breadcrumbs_tree
    [
      ['admin/homes#show', 'admin/channels#index', 'admin/channels#new'],
      ['admin/homes#show', 'admin/channels#index', 'admin/channels#show', 'admin/channels#edit'],
      ['admin/homes#show', 'admin/videos#index', 'admin/videos#show', 'admin/videos#edit'],
      ['admin/homes#show', 'admin/videos#index', 'admin/videos#new'],
      ['admin/homes#show', 'admin/videos#index', 'admin/videos#show',
       'admin/videos/song_items#index', 'admin/videos/song_items#show',
       'admin/videos/song_items#edit'],
      ['admin/homes#show', 'admin/videos#index', 'admin/videos#show',
       'admin/videos/song_items#index', 'admin/videos/song_items#new'],
      ['admin/homes#show', 'admin/videos#index', 'admin/videos#show',
       'admin/videos/song_items#index', 'admin/videos/song_items#show',
       'admin/videos/song_diffs#index', 'admin/videos/song_diffs#show',
       'admin/videos/song_diffs#edit'],
      ['admin/homes#show', 'admin/videos#index', 'admin/videos#show',
       'admin/videos/song_items#index', 'admin/videos/song_items#show',
       'admin/videos/song_diffs#index', 'admin/videos/song_diffs#new'],
      ['admin/homes#show', 'admin/videos#index', 'admin/videos#show',
       'admin/videos/comments#index', 'admin/videos/comments#show',
       'admin/videos/comments#edit'],
      ['admin/homes#show', 'admin/videos#index', 'admin/videos#show',
       'admin/videos/comments#index', 'admin/videos/comments#new'],
    ]
  end

  def breadcrumbs_url(name)
    case name
    when 'admin/homes#show'
      { name: '管理者ページ', url: admin_path }
    when 'admin/channels#index'
      { name: 'チャンネル一覧', url: admin_channels_path }
    when 'admin/channels#show'
      { name: @channel.name, url: admin_channel_path(@channel) }
    when 'admin/channels#new'
      { name: '新規作成', url: new_admin_channel_path }
    when 'admin/channels#edit'
      { name: '編集', url: edit_admin_channel_path(@channel) }
    when 'admin/videos#index'
      { name: '動画一覧', url: admin_videos_path }
    when 'admin/videos#show'
      { name: @video.title[0, 10], url: admin_video_path(@video) }
    when 'admin/videos#edit'
      { name: '編集', url: edit_admin_video_path(@video) }
    when 'admin/videos#new'
      { name: '新規作成', url: new_admin_video_path }
    when 'admin/videos/song_items#index'
      { name: '歌一覧', url: admin_video_song_items_path(@video) }
    when 'admin/videos/song_items#show'
      { name: @song_item.title || @song_item.id, url: admin_video_song_item_path(@video, @song_item) }
    when 'admin/videos/song_items#edit'
      { name: '編集', url: edit_admin_video_song_item_path(@video, @song_item) }
    when 'admin/videos/song_items#new'
      { name: '新規作成', url: new_admin_video_song_item_path(@video) }
    when 'admin/videos/song_diffs#index'
      { name: '差分一覧', url: admin_video_song_item_song_diffs_path(@video, @song_item) }
    when 'admin/videos/song_diffs#show'
      { name: @song_diff.title, url: admin_video_song_item_song_diff_path(@video, @song_item, @song_diff) }
    when 'admin/videos/song_diffs#edit'
      { name: '編集', url: edit_admin_video_song_item_song_diff_path(@video, @song_item, @song_diff) }
    when 'admin/videos/song_diffs#new'
      { name: '新規作成', url: new_admin_video_song_item_song_diff_path(@video, @song_item) }
    when 'admin/videos/comments#index'
      { name: 'コメント一覧', url: admin_video_comments_path(@video) }
    when 'admin/videos/comments#show'
      { name: @comment.content[0, 10], url: admin_video_comment_path(@video, @comment) }
    when 'admin/videos/comments#edit'
      { name: '編集', url: edit_admin_video_comment_path(@video, @comment) }
    when 'admin/videos/comments#new'
      { name: '新規作成', url: new_admin_video_comment_path(@video) }
    else
      raise "breadcrumbs_url に #{name} が定義されていません！"
    end
  end
end
