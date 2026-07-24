function isOddOrEven(number) {
    if (number % 2 === 0) {
        return "Even";
    } else {
        return "Odd";
    }
}
console.log(isOddOrEven(10));

function checkNumberType(number) {
    let result;
    if (number > 0) {
        result = "Positive";
    } else if (number < 0) {
        result = "Negative";
    } else {
        result = "Neutral";
    }
    return result;
}

console.log(checkNumberType(5));   // Positive
console.log(checkNumberType(-3));  // Negative
console.log(checkNumberType(0));   // Neutral

function launchBrowser(browserName) {
    if (browserName === "chrome") {
        console.log("Launching Chrome browser");
    } else {
        console.log("Launching " + browserName + " browser");
    }
}

launchBrowser("chrome");
launchBrowser("firefox");

function runTests(testType) {
    switch (testType) {
        case "smoke":
            console.log("Running Smoke tests");
            break;
        case "sanity":
            console.log("Running Sanity tests");
            break;
        case "regression":
            console.log("Running Regression tests");
            break;
        default:
            console.log("Running Smoke tests");
    }
}

runTests("smoke");
runTests("sanity");
runTests("regression");
runTests("performance");
