json.song_diffs do
  json.array! @song_diffs do |song_diff|
    json.partial! song_diff
  end
end
