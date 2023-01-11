import { useEffect } from "react";
import "./App.css";

const devMode = true;

const App = () => {
    useEffect(() => {
        const script = document.createElement("script");
        script.src = "https://cfx-nui-lb-phone/ui/components.js";
        document.body.appendChild(script);

        if (devMode) {
            document.getElementsByTagName("html")[0].style.visibility = "visible";
            document.getElementsByTagName("body")[0].style.visibility = "visible";
        }

        return () => document.body.removeChild(script);
    }, []);

    return (
        <AppProvider>
            <div className="app">
                <button
                    id="button"
                    onClick={() => {
                        window.SetPopUp({
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
                        window.SetContextMenu({
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
                        window.SelectGallery({
                            includeVideos: true,
                            includeImages: true,
                            cb: (data) => {
                                window.SetPopUp({
                                    title: "Selected media",
                                    attachment: data,
                                    buttons: [
                                        {
                                            title: "OK",
                                        },
                                    ],
                                });
                            },
                        });
                    }}
                >
                    gallery
                </button>
                <button
                    id="photos"
                    onClick={() => {
                        window.SelectGallery({
                            includeVideos: false,
                            includeImages: true,
                            cb: (data) => {
                                window.SetPopUp({
                                    title: "Selected photo",
                                    attachment: data,
                                    buttons: [
                                        {
                                            title: "OK",
                                        },
                                    ],
                                });
                            },
                        });
                    }}
                >
                    photos
                </button>
                <button
                    id="videos"
                    onClick={() => {
                        window.SelectGallery({
                            includeVideos: true,
                            includeImages: false,
                            cb: (data) => {
                                window.SetPopUp({
                                    title: "Selected video",
                                    attachment: data,
                                    buttons: [
                                        {
                                            title: "OK",
                                        },
                                    ],
                                });
                            },
                        });
                    }}
                >
                    videos
                </button>
                <button
                    id="gif"
                    onClick={() => {
                        window.SelectGIF((gif) => {
                            window.SetPopUp({
                                title: "Selected GIF",
                                attachment: { src: gif },
                                buttons: [
                                    {
                                        title: "OK",
                                    },
                                ],
                            });
                        });
                    }}
                >
                    gif
                </button>
                <button
                    id="emoji"
                    onClick={() => {
                        window.SelectEmoji((emoji) => {
                            window.SetPopUp({
                                title: "Selected emoji",
                                description: emoji,
                                buttons: [
                                    {
                                        title: "OK",
                                    },
                                ],
                            });
                        });
                    }}
                >
                    emoji
                </button>
            </div>
        </AppProvider>
    );
};

const AppProvider = ({ children }) => {
    if (devMode) {
        return <div className="dev-wrapper">{children}</div>;
    } else return children;
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
