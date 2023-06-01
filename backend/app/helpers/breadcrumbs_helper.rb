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
      ['admin/homes#show']
    ]
  end

  def breadcrumbs_url(name)
    case name
    when 'admin/homes#show'
      { name: '管理者ページ', url: admin_path }
    else
      raise "breadcrumbs_url に #{name} が定義されていません！"
    end
  end
end
