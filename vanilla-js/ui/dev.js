// You can ignore this file. All it does is make the UI work on your browser.

window.addEventListener("load", () => {
    if (window.invokeNative) {
        const phoneWrapper = document.getElementById("phone-wrapper");
        const app = phoneWrapper.querySelector(".app");
        phoneWrapper.parentNode.insertBefore(app, phoneWrapper);
        phoneWrapper.parentNode.removeChild(phoneWrapper);
        return;
    };

    document.getElementById("phone-wrapper").style.display = "block";
    document.body.style.visibility = "visible";

    function center() {
        document.getElementById("phone-wrapper").style.scale = window.innerWidth/1920;
        document.getElementById("phone-wrapper").style.marginTop = window.innerHeight/2 - 960/2 + "px";
        document.getElementById("phone-wrapper").style.marginLeft = window.innerWidth/2 - 540/2 + "px";
    }
    
    center();
    window.addEventListener("resize", center);
})