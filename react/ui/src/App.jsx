import { useEffect } from "react";
import "./App.css";

const App = () => {
    useEffect(() => {
        const script = document.createElement("script");
        script.src = "https://cfx-nui-lb-phone/ui/components.js";
        document.body.appendChild(script);

        return () => document.body.removeChild(script);
    }, []);

    return (
        <div className="app">
            {/* <button
                id="button"
                onClick={() => {
                    SetPopUp({
                        title: "Background",
                        description: "Change background color",
                        buttons: [
                            {
                                title: "Set background to green",
                                color: "green",
                                cb: () => {
                                    document.getElementsByClassName("app")[0].style.backgroundColor = "green";
                                },
                            },
                            {
                                title: "Set background to red",
                                color: "red",
                                cb: () => {
                                    document.getElementsByClassName("app")[0].style.backgroundColor = "red";
                                },
                            },
                        ],
                    });
                }}
            >
                popup
            </button>
            <button
                id="context"
                onClick={() => {
                    SetContextMenu({
                        title: "Context menu",
                        buttons: [
                            {
                                title: "Button 1",
                                color: "green",
                                cb: () => {
                                    console.log("Button 1");
                                },
                            },
                            {
                                title: "Button 2",
                                color: "red",
                                cb: () => {
                                    console.log("Button 2");
                                },
                            },
                        ],
                    });
                }}
            >
                context menu
            </button>
            <button
                id="gallery"
                onClick={() => {
                    SelectGallery({
                        includeVideos: true,
                        includeImages: true,
                        cb: (data) => {
                            document.getElementsByClassName("app")[0].style.backgroundImage = `url(${data.src})`;
                        },
                    });
                }}
            >
                gallery
            </button>
            <button
                id="photos"
                onClick={() => {
                    SelectGallery({
                        includeVideos: false,
                        includeImages: true,
                        cb: (data) => {
                            document.getElementsByClassName("app")[0].style.backgroundImage = `url(${data.src})`;
                        },
                    });
                }}
            >
                photos
            </button>
            <button
                id="videos"
                onClick={() => {
                    SelectGallery({
                        includeVideos: true,
                        includeImages: false,
                        cb: (data) => {
                            document.getElementsByClassName("app")[0].style.backgroundImage = `url(${data.src})`;
                        },
                    });
                }}
            >
                videos
            </button>
            <button
                id="gif"
                onClick={() => {
                    SelectGIF((gif) => {
                        document.getElementsByClassName("app")[0].style.backgroundImage = `url(${gif})`;
                    });
                }}
            >
                gif
            </button>
            <button
                id="emoji"
                onClick={() => {
                    SelectEmoji((emoji) => {
                        console.log(emoji);
                    });
                }}
            >
                emoji
            </button> */}
        </div>
    );
};

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
        fetch(`https://${window.GetParentResourceName()}/${action}`, options)
            .then((response) => response.json())
            .then(resolve)
            .catch(reject);
    });
};

(async () => {
    console.log(await window.GetSettings());
    console.log(await window.GetLocale("APPS.SETTINGS.TITLE")); //GET LOCALE KEYS

    console.log(await window.fetchData("saveData", { id: 1 }));
})();

export default App;
