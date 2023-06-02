json.song_items do
  json.array! @song_items do |song_item|
    json.partial! song_item
  end
end
