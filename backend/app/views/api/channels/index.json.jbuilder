json.api_status 'ok'
json.channels do
  json.array! @channels do |channel|
    json.partial! channel
  end
end

