json.user do
  if current_user.present?
    json.partial! current_user
  else
    nil
  end
end
