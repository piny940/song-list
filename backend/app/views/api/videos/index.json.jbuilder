json.videos do
  json.array! @videos do |video|
    json.partial! video
  end
end
json.total_pages @total_pages
