function orientationhandler(event) {
    let degrees = Math.floor(event.alpha);
    if (degrees === 0) {
        degrees = 360;
    }
    document.querySelector("#needle").innerHTML = `&nbsp;${360-degrees}&deg;`;
    document.querySelector("#compass").style.transform = `rotate(${degrees}deg)`;
}

function nodeviceorientation() {
    alert("Your browser does not support Device Orientation Absolute! This compass will not work!");
}
if ("ondeviceorientationabsolute" in window) {
    window.addEventListener("deviceorientationabsolute", orientationhandler);
} else {
    if ("ondeviceorientation" in window) {
        window.addEventListener("deviceorientation", evt => {
            if (evt.absolute) {
                orientationhandler(evt);
            } else if ("webkitCompassHeading" in evt) {
                let degrees = Math.floor(evt.webkitCompassHeading);
                if (degrees === 360) {
                    degrees = 0;
                }
                document.querySelector("#needle").innerHTML = `&nbsp;${degrees}&deg;`;
                document.querySelector("#compass").style.transform = `rotate(${360-degrees}deg)`;
            }
        })
    } else {
        nodeviceorientation();
    }
}
window.addEventListener("compassneedscalibration", function (event) {
    alert("Your compass needs calibration! Wave your device in a figure-eight motion.")
})