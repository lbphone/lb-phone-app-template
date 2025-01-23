---@param action string
---@param data any
function SendAppMessage(action, data)
    exports["lb-phone"]:SendCustomAppMessage(Config.Identifier, {
        action = action,
        data = data
    })
end
