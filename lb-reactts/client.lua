local identifier = "react-ts-template"

while GetResourceState("lb-phone") ~= "started" do
    Wait(500)
end

local function addApp()
    local added, errorMessage = exports["lb-phone"]:AddCustomApp({
        identifier = identifier, -- unique app identifier

        name = "React TS",
        description = "Template app using React and TypeScript.",
        developer = "LB",

        defaultApp = false, --  set to true, the app will automatically be added to the player's phone
        size = 59812, -- the app size in kb
        -- price = 0, -- OPTIONAL make players pay with in-game money to download the app

        images = { -- OPTIONAL array of screenshots of the app, used for showcasing the app
            "https://cfx-nui-" .. GetCurrentResourceName() .. "/ui/dist/screenshot-light.png",
            "https://cfx-nui-" .. GetCurrentResourceName() .. "/ui/dist/screenshot-dark.png"
        },

        -- ui = "http://localhost:3000",
        ui = GetCurrentResourceName() .. "/ui/dist/index.html",

        icon = "https://cfx-nui-" .. GetCurrentResourceName() .. "/ui/dist/icon.svg",

        fixBlur = true -- set to true if you use em, rem etc instead of px in your css
    })

    if not added then
        print("Could not add app:", errorMessage)
    end
end

addApp()

AddEventHandler("onResourceStart", function(resource)
    if resource == "lb-phone" then
        addApp()
    end
end)

local directions = { "N", "NE", "E", "SE", "S", "SW", "W", "NW" }
local oldYaw, oldDirection

RegisterNUICallback("getDirection", function(data, cb)
    cb(oldDirection)
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

    -- get closest direction
    if oldYaw ~= yaw then
        oldYaw = yaw
        oldDirection = yaw .. "° " .. directions[math.floor((yaw + 22.5) / 45.0) % 8 + 1]

        exports["lb-phone"]:SendCustomAppMessage(identifier, {
            type = "updateDirection",
            direction = oldDirection
        })
    end
end
