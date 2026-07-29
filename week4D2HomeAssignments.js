"use strict";
//Enumeration for different environments
var Environment;
(function (Environment) {
    Environment["LOCAL"] = "LOCAL";
    Environment["DEVELOPMENT"] = "DEVELOPMENT";
    Environment["STAGING"] = "STAGING";
    Environment["PRODUCTION"] = "PRODUCTION";
})(Environment || (Environment = {}));
function runTests(env) {
    console.log(`Running tests against the ${env} environment.`);
}
runTests(Environment.LOCAL);
runTests(Environment.DEVELOPMENT);
runTests(Environment.STAGING);
runTests(Environment.PRODUCTION);
//Fibonacci series 
function fibonacci(n) {
    if (n === 0)
        return 0;
    if (n === 1)
        return 1;
    let prev = 0;
    let curr = 1;
    for (let i = 2; i <= n; i++) {
        let next = prev + curr;
        prev = curr;
        curr = next;
    }
    return curr;
}
console.log(`fibonacci(0) = ${fibonacci(0)}`);
console.log(`fibonacci(1) = ${fibonacci(1)}`);
console.log(`fibonacci(5) = ${fibonacci(5)}`);
console.log(`fibonacci(10) = ${fibonacci(10)}`);
console.log(`fibonacci(15) = ${fibonacci(15)}`);
//Factorial
function factorial(n) {
    if (n < 0) {
        throw new Error(`Factorial is not defined for negative numbers. Received: ${n}`);
    }
    let result = 1;
    for (let i = 2; i <= n; i++) {
        result *= i;
    }
    return result;
}
console.log(`factorial(0) = ${factorial(0)}`);
console.log(`factorial(1) = ${factorial(1)}`);
console.log(`factorial(5) = ${factorial(5)}`);
console.log(`factorial(10) = ${factorial(10)}`);
try {
    console.log(`factorial(-3) = ${factorial(-3)}`);
}
catch (error) {
    console.error(`Error: ${error.message}`);
}
