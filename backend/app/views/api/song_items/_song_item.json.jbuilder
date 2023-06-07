json.extract! song_item, :id
json.time song_item.time
json.title song_item.title
json.author song_item.author
json.video do
  json.partial! song_item.video
end
