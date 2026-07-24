// Print duplicates in an array
let num = [56, 78, 90, 23, 90, 76, 43, 56];

let duplicates = [];

for (let i = 0; i < num.length; i++) {
    for (let j = i + 1; j < num.length; j++) {
        if (num[i] === num[j] && !duplicates.includes(num[i])) {
            duplicates.push(num[i]);
        }
    }
}

console.log("Duplicates:", duplicates);
