json.channels do
  json.array! @channels do |channel|
    json.partial! channel
  end
end
