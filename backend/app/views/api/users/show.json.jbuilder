json.user do
  json.partial! current_user if current_user.present?
end
