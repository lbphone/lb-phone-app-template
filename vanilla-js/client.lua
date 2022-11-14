RegisterNUICallback('saveData', function(data, cb)
    print("Received Data: ", json.encode(data))
    cb('ok')
end)