CreateThread(function ()
    while not GetResourceState("lb-phone") == "started" do
        Wait(0)
    end

    local added, errorMessage = exports["lb-phone"]:AddCustomApp({
        identifier = "test-app",
        name = "Test App",
        description = "This is a test app",
        developer = "Breze",
        defaultApp = true, -- OPTIONAL if set to true, app should be added without having to download it,
        size = 59812, -- OPTIONAL in kb
        images = {"https://example.com/photo.jpg"}, -- OPTIONAL array of images for the app on the app store
        ui = GetCurrentResourceName() .. "/ui/index.html" -- this is the path to the HTML file
    })
    if not added then
        print("Could not add app:", errorMessage)
    end  
end)

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

