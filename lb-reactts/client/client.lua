while GetResourceState("lb-phone") ~= "started" do
    Wait(500)
end

Wait(1000) -- wait for the AddCustomApp export to exist

local url = GetResourceMetadata(GetCurrentResourceName(), "ui_page", 0)

local function AddApp()
    local added, errorMessage = exports["lb-phone"]:AddCustomApp({
        identifier = Config.Identifier, -- unique app identifier

        name = Config.Name,
        description = Config.Description,
        developer = Config.Developer,

        defaultApp = Config.DefaultApp, -- should the app be installed by default? this also means that you can't uninstall it
        size = 59812, -- the app size in kb
        -- price = 0, -- OPTIONAL: require players to pay for the app with in-game money to download it

        images = { -- OPTIONAL array of screenshots of the app, used for showcasing the app
            "https://cfx-nui-" .. GetCurrentResourceName() .. "/ui/dist/screenshot-light.png",
            "https://cfx-nui-" .. GetCurrentResourceName() .. "/ui/dist/screenshot-dark.png"
        },

        ui = url:find("http") and url or GetCurrentResourceName() .. "/" .. url,
        icon = url:find("http") and url .. "/public/icon.svg" or "https://cfx-nui-" .. GetCurrentResourceName() .. "/ui/dist/icon.svg",

        fixBlur = true,

        onClose = function()
            exports["lb-phone"]:DisableWalkableCam()
        end
    })

    if not added then
        print("Could not add app:", errorMessage)
    end
end

AddApp()

AddEventHandler("onResourceStart", function(resource)
    if resource == "lb-phone" then
        AddApp()
    end
end)

local directions = { "N", "NE", "E", "SE", "S", "SW", "W", "NW" }
local oldYaw, currentDirection

RegisterNUICallback("getDirection", function(data, cb)
    cb(currentDirection)
end)

RegisterNUICallback("toggleCamera", function(toggle, cb)
    if toggle then
        exports["lb-phone"]:EnableWalkableCam()
    else
        exports["lb-phone"]:DisableWalkableCam()
    end

    cb("ok")
end)

RegisterNUICallback("drawNotification", function(data, cb)
    BeginTextCommandThefeedPost("STRING")
    AddTextComponentSubstringPlayerName(data.message)
    EndTextCommandThefeedPostTicker(false, false)

    cb("ok")
end)

while true do
    Wait(25)

    local yaw = math.floor(360.0 - ((GetFinalRenderedCamRot(0).z + 360.0) % 360.0) + 0.5)

    if yaw == 360 then
        yaw = 0
    end

    if oldYaw ~= yaw then
        oldYaw = yaw
        currentDirection = yaw .. "° " .. directions[math.floor((yaw + 22.5) / 45.0) % 8 + 1]

        SendAppMessage("updateDirection", currentDirection)
    end
end
