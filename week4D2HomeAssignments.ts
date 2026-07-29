//Enumeration for different environments
enum Environment {
    LOCAL = "LOCAL",
    DEVELOPMENT = "DEVELOPMENT",
    STAGING = "STAGING",
    PRODUCTION = "PRODUCTION"
}

function runTests(env: Environment): void {
    console.log(`Running tests against the ${env} environment.`);
}

runTests(Environment.LOCAL);
runTests(Environment.DEVELOPMENT);
runTests(Environment.STAGING);
runTests(Environment.PRODUCTION);
//Fibonacci series 
function fibonacci(n: number): number {
    if (n === 0) return 0;
    if (n === 1) return 1;

    let prev: number = 0;
    let curr: number = 1;

    for (let i = 2; i <= n; i++) {
        let next: number = prev + curr;
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
function factorial(n: number): number {
    if (n < 0) {
        throw new Error(`Factorial is not defined for negative numbers. Received: ${n}`);
    }

    let result: number = 1;

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
} catch (error) {
    console.error(`Error: ${(error as Error).message}`);
}

