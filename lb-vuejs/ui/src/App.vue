<script setup>
import { ref, onMounted, watch } from "vue";

const devMode = !window.invokeNative;

const theme = ref("light");
const direction = ref("N");
const notificationText = ref("Notification text");

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
  useCamera,
} = window;

onMounted(() => {
  if (devMode) {
    document.documentElement.style.visibility = "visible";
    document.body.style.visibility = "visible";
  } else {
    getSettings()
      .then((settings) => (theme.value = settings.display.theme))
      .catch((error) => console.error("Error fetching settings:", error));

    onSettingsChange((settings) => {
      theme.value = settings.display.theme;
    });
  }

  if (typeof fetchNui === "function") {
    fetchNui("getDirection").then((dir) => {
      direction.value = dir;
    });
  }

  window.addEventListener("message", (e) => {
    if (e.data?.type === "updateDirection") direction.value = e.data.direction;
  });
});

watch(notificationText, (newValue) => {
  if (newValue === "") notificationText.value = "Notification text";
});

const showPopupMenu = () => {
  setPopUp({
    title: "Popup Menu",
    description: "Confirm your choice",
    buttons: [
      {
        title: "Cancel",
        color: "red",
        cb: () => console.log("Cancel"),
      },
      {
        title: "Confirm",
        color: "blue",
        cb: () => console.log("Confirm"),
      },
    ],
  });
};

const showContextMenu = () => {
  setContextMenu({
    title: "Context menu",
    buttons: [
      {
        title: "Phone Notification",
        color: "blue",
        cb: () => sendNotification({ title: notificationText.value }),
      },
      {
        title: "GTA Notification",
        color: "red",
        cb: () =>
          fetchNui("drawNotification", { message: notificationText.value }),
      },
    ],
  });
};

const selectGIFHandler = () => {
  selectGIF((gif) => {
    setPopUp({
      title: "Selected GIF",
      attachment: { src: gif },
      buttons: [{ title: "OK" }],
    });
  });
};

const selectGalleryHandler = () => {
  selectGallery({
    includeVideos: true,
    includeImages: true,
    cb: (data) => {
      setPopUp({
        title: "Selected media",
        attachment: data,
        buttons: [{ title: "OK" }],
      });
    },
  });
};

const selectEmojiHandler = () => {
  selectEmoji((emoji) => {
    setPopUp({
      title: "Selected emoji",
      description: emoji,
      buttons: [{ title: "OK" }],
    });
  });
};

const colorPickerHandler = () => {
  colorPicker((color) => {
    setPopUp({
      title: "Selected color",
      description: color,
      buttons: [{ title: "OK" }],
    });
  });
};

const useCameraHandler = () => {
  useCamera(
    (url) => {
      setPopUp({
        title: "Media taken",
        attachment: { src: url },
        buttons: [{ title: "OK" }],
      });
    },
    {
      default: {
        type: "Photo", // 'Photo' | 'Video' | 'Landscape'
        flash: false,
        camera: "rear", // 'rear' | 'front'
      },
      permissions: {
        toggleFlash: true,
        flipCamera: true,
        takePhoto: true,
        takeVideo: true,
        takeLandscapePhoto: true,
      },
    }
  );
};
</script>

<template>
  <div :class="['app', { 'dev-wrapper': devMode }]" :data-theme="theme">
    <div class="app-wrapper">
      <div class="header">
        <div class="title">Custom App Template</div>
        <div class="subtitle">Vue.js</div>
        <a class="subtitle">{{ direction }}</a>
      </div>
      <div class="button-wrapper">
        <button @click="showPopupMenu">Popup Menu</button>
        <button @click="showContextMenu">Context menu</button>
        <button @click="selectGIFHandler">Gif Selector</button>
        <button @click="selectGalleryHandler">Gallery Selector</button>
        <button @click="selectEmojiHandler">Emoji Selector</button>
        <button @click="colorPickerHandler">Color Picker</button>
        <button @click="useCameraHandler">Camera Component</button>
        <input placeholder="Notification text" v-model="notificationText" />
      </div>
    </div>
  </div>
</template>

<style scoped>
/* Add your styles here */
</style>