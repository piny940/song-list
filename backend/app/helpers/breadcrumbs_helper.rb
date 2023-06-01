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
      ['admin/homes#show', 'admin/channels#index', 'admin/channels#show', 'admin/channels#edit']
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
      { name: '新規チャンネル作成', url: new_admin_channel_path }
    when 'admin/channels#edit'
      { name: '編集', url: edit_admin_channel_path(@channel) }
    else
      raise "breadcrumbs_url に #{name} が定義されていません！"
    end
  end
end
