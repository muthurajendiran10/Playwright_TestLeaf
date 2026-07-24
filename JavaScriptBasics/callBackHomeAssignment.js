// Step 1: Declare a global variable
let browser = "Chrome";

// Step 2: Function that accepts a callback and uses setTimeout to simulate a delay
function checkBrowserVersion(callback) {
    setTimeout(function () {
        callback(browser);
    }, 2000);
}

// Step 3: Callback function that logs the browser version
function printBrowserVersion(browserName) {
    console.log("Browser version using callback: " + browserName);
}

// Step 4: Call checkBrowserVersion and pass the callback
checkBrowserVersion(printBrowserVersion);
