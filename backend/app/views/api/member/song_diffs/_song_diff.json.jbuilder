json.extract! song_diff, :id, :song_item_id, :time, :title, :author, :status, :kind, :created_at, :updated_at
json.made_by do
  if song_diff.made_by.present?
    json.partial! 'api/users/user', user: song_diff.made_by
  else
    json.user nil
  end
end
