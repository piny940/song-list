json.song_diffs do
  json.array! @song_diffs do |song_diff|
    json.partial! song_diff
  end
end
json.next_song_diff @next_song_diff
json.total_pages @total_pages
