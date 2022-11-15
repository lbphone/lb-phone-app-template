document.getElementById("button").onclick = () => {
    SetPopUp({
        title: "Background",
        description: "Change background color",
        buttons: [
            {
                title: "Set background to green",
                color: "green",
                cb: () => {
                    document.getElementsByClassName("app")[0].style.backgroundColor = "green";
                }
            }, {
                title: "Set background to red",
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
            document.getElementsByClassName("app")[0].style.backgroundImage = `url(${data.src})`;
        })
    })
}

document.getElementById("photos").onclick = () => {
    SelectGallery({
        includeVideos: false,
        includeImages: true,
        cb: (data => {
            document.getElementsByClassName("app")[0].style.backgroundImage = `url(${data.src})`;
        })
    })
}

document.getElementById("videos").onclick = () => {
    SelectGallery({
        includeVideos: true,
        includeImages: false,
        cb: (data => {
            document.getElementsByClassName("app")[0].style.backgroundImage = `url(${data.src})`;
        })
    })
}

document.getElementById("gif").onclick = () => {
    SelectGIF((gif) => {
        document.getElementsByClassName("app")[0].style.backgroundImage = `url(${gif})`;
    })
}

document.getElementById("emoji").onclick = () => {
    SelectEmoji((emoji) => {
        console.log(emoji);
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
        fetch(`https://${GetParentResourceName()}/${action}`, options)
            .then((response) => response.json())
            .then(resolve)
            .catch(reject);
    });
};

(async () => {
    console.log(await GetSettings())
    console.log(await GetLocale("APPS.SETTINGS.TITLE"))

    console.log(await fetchData("saveData", { id: 1 }));
})();
