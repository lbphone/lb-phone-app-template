document.getElementById("popup").onclick = () => {
    SetPopUp({
        title: "Background",
        description: "Change background color",
        buttons: [
            {
                title: "Blue",
                color: "blue",
                cb: () => {
                    document.getElementsByClassName("app")[0].style.backgroundColor = "blue";
                }
            }, {
                title: "Red",
                color: "red",
                cb: () => {
                    document.getElementsByClassName("app")[0].style.backgroundColor = "red";
                }
            }
        ]
    })
};

document.getElementById("context").onclick = () => {
    SetContextMenu({
        title: "Context menu",
        buttons: [
            {
                title: "Button 1",
                color: "green",
                cb: () => {
                    console.log("Button 1");
                }
            },
            {
                title: "Button 2",
                color: "red",
                cb: () => {
                    console.log("Button 2");
                }
            }
        ]
    })
}

document.getElementById("gallery").onclick = () => {
    SelectGallery({
        includeVideos: true,
        includeImages: true,
        cb: (data => {
            SetPopUp({
                title: "Selected media",
                attachment: data,
                buttons: [
                    {
                        title: "OK",
                    }
                ]
            })
        })
    })
}

document.getElementById("photos").onclick = () => {
    SelectGallery({
        includeVideos: false,
        includeImages: true,
        cb: (data => {
            SetPopUp({
                title: "Selected photo",
                attachment: data,
                buttons: [
                    {
                        title: "OK",
                    }
                ]
            })
        })
    })
}

document.getElementById("videos").onclick = () => {
    SelectGallery({
        includeVideos: true,
        includeImages: false,
        cb: (data => {
            SetPopUp({
                title: "Selected video",
                attachment: data,
                buttons: [
                    {
                        title: "OK",
                    }
                ]
            })
        })
    })
}

document.getElementById("gif").onclick = () => {
    SelectGIF((gif) => {
        SetPopUp({
            title: "Selected GIF",
            attachment: {src: gif},
            buttons: [
                {
                    title: "OK",
                }
            ]
        })
    })
}

document.getElementById("emoji").onclick = () => {
    SelectEmoji((emoji) => {
        SetPopUp({
            title: "Selected emoji",
            description: emoji,
            buttons: [
                {
                    title: "OK",
                }
            ]
        })
    })
}

const fetchData = (action, data) => {
    if (!action || !data) return;

    const options = {
        method: "post",
        headers: {
            "Content-Type": "application/json; charset=UTF-8",
        },
        body: JSON.stringify(data),
    };

    return new Promise((resolve, reject) => {
        fetch(`https://${resourceName}/${action}`, options)
            .then((response) => response.json())
            .then(resolve)
            .catch(reject);
    });
};

window.addEventListener("load", () => {
    OnSettingsChange(settings => {
        if (settings.display.theme == "dark") {
            console.log("Dark mode enabled")
        } else {
            console.log("Light mode enabled")
        }
    })
});

(async () => {
    console.log(await GetSettings())
    console.log(await GetLocale("APPS.SETTINGS.TITLE"))
})();