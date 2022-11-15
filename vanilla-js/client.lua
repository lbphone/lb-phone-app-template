RegisterNUICallback("saveData", function(data, cb)
    print("Received Data: ", json.encode(data))
    cb("ok")
end)

-- This event is needed for `OnSettingsChange` to work
RegisterNetEvent("lb-phone:settingsUpdated", function(settings)
    SendNUIMessage({
        type = "settingsUpdated",
        settings = settings
    })
end)