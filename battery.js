console.log("Hello")

const batteryLevel = require("battery-level");

batteryLevel().then(level => {
    console.log(level * 100)
})