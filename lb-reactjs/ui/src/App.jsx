import { useEffect, useRef, useState } from "react"
import "./App.css"

const devMode = !window.invokeNative

const App = () => {
	const [theme, setTheme] = useState("light")
	const [direction, setDirection] = useState("N")
	const [notificationText, setNotificationText] = useState("Notification text")
	const appDiv = useRef(null)

	const {
		setPopUp,
		setContextMenu,
		selectGIF,
		selectGallery,
		selectEmoji,
		fetchNui,
		sendNotification,
		getSettings,
		onSettingsChange,
		colorPicker,
		useCamera
	} = window

	useEffect(() => {
		if (devMode) {
			document.getElementsByTagName("html")[0].style.visibility = "visible"
			document.getElementsByTagName("body")[0].style.visibility = "visible"
			return
		} else {
			getSettings().then((settings) => setTheme(settings.display.theme))
			onSettingsChange((settings) => setTheme(settings.display.theme))
		}

		fetchNui("getDirection").then((direction) => setDirection(direction))

		window.addEventListener("message", (e) => {
			if (e.data?.type === "updateDirection") setDirection(e.data.direction)
		})
	}, [])

	useEffect(() => {
		if (notificationText === "") setNotificationText("Notification text")
	}, [notificationText])

	return (
		<AppProvider>
			<div className="app" ref={appDiv} data-theme={theme}>
				<div className="app-wrapper">
					<div className="header">
						<div className="title">Custom App Template</div>
						<div className="subtitle">React JS</div>
						<a className="subtitle">{direction}</a>
					</div>
					<div className="button-wrapper">
						<button
							id="button"
							onClick={() => {
								setPopUp({
									title: "Popup Menu",
									description: "Confirm your choice",
									buttons: [
										{
											title: "Cancel",
											color: "red",
											cb: () => {
												console.log("Cancel")
											}
										},
										{
											title: "Confirm",
											color: "blue",
											cb: () => {
												console.log("Confirm")
											}
										}
									]
								})
							}}
						>
							Popup Menu
						</button>
						<button
							id="context"
							onClick={() => {
								setContextMenu({
									title: "Context menu",
									buttons: [
										{
											title: "Phone Notification",
											color: "blue",
											cb: () => {
												sendNotification({ title: notificationText })
											}
										},
										{
											title: "GTA Notification",
											color: "red",
											cb: () => {
												fetchNui("drawNotification", { message: notificationText })
											}
										}
									]
								})
							}}
						>
							Context menu
						</button>
						<button
							id="gif"
							onClick={() => {
								selectGIF((gif) => {
									setPopUp({
										title: "Selected GIF",
										attachment: { src: gif },
										buttons: [
											{
												title: "OK"
											}
										]
									})
								})
							}}
						>
							Gif Selector
						</button>
						<button
							id="gallery"
							onClick={() => {
								selectGallery({
									includeVideos: true,
									includeImages: true,
									cb: (data) => {
										setPopUp({
											title: "Selected media",
											attachment: data,
											buttons: [
												{
													title: "OK"
												}
											]
										})
									}
								})
							}}
						>
							Gallery Selector
						</button>
						<button
							id="emoji"
							onClick={() => {
								selectEmoji((emoji) => {
									setPopUp({
										title: "Selected emoji",
										description: emoji,
										buttons: [
											{
												title: "OK"
											}
										]
									})
								})
							}}
						>
							Emoji Selector
						</button>
						<button
							id="colorpicker"
							onClick={() => {
								colorPicker((color) => {
									setPopUp({
										title: "Selected color",
										description: color,
										buttons: [
											{
												title: "OK"
											}
										]
									})
								})
							}}
						>
							Color Picker
						</button>
						<button
							id="camreacomponent"
							onClick={() => {
								useCamera(
									(url) => {
										setPopUp({
											title: "Media taken",
											attachment: { src: url },
											buttons: [
												{
													title: "OK"
												}
											]
										})
									},
									{
										default: {
											type: "Photo", // 'Photo' | 'Video' | 'Landscape'
											flash: false,
											camera: "rear" // 'rear' | 'front'
										},
										permissions: {
											toggleFlash: true,
											flipCamera: true,
											takePhoto: true,
											takeVideo: true,
											takeLandscapePhoto: true
										}
									}
								)
							}}
						>
							Camera Component
						</button>
						<input placeholder="Notification text" onChange={(e) => setNotificationText(e.target.value)}></input>
					</div>
				</div>
			</div>
		</AppProvider>
	)
}

const AppProvider = ({ children }) => {
	if (devMode) {
		return <div className="dev-wrapper">{children}</div>
	} else return children
}

const fetchData = (action, data) => {
	if (!action || !data) return

	const options = {
		method: "post",
		headers: {
			"Content-Type": "application/json; charset=UTF-8"
		},
		body: JSON.stringify(data)
	}

	return new Promise((resolve, reject) => {
		fetch(`https://${window.resourceName}/${action}`, options)
			.then((response) => response.json())
			.then(resolve)
			.catch(reject)
	})
}

export default App
