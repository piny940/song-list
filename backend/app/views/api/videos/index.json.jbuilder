json.videos do
  json.array! @videos do |video|
    json.partial! video
  end
end
