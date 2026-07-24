// Example 1: Length of the last word using split
// 1. Split the string into an array of words.
// 2. Find the last word in the array.
// 3. Calculate the length of this word.

function lengthOfLastWord(s) {
    // Step 1: Split the string into an array of words
    const words = s.split(' ');

    // Step 2: Find the last word in the array
    const lastWord = words[words.length - 1];

    // Step 3: Calculate the length of the last word
    return lastWord.length;
}

console.log(lengthOfLastWord("Hello World")); // Output: 5


// Example 2: Length of the last word with trimming
// 1. Trim the String
// 2. Split the String into Words
// 3. Identify the Last Word
// 4. Calculate the Length of the Last Word
// 5. Return the length

function lengthOfLastWordTrimmed(s) {
    // Step 1: Trim leading and trailing spaces
    const trimmed = s.trim();

    // Step 2: Split the trimmed string into words
    const words = trimmed.split(' ');

    // Step 3: Identify the last word
    const lastWord = words[words.length - 1];

    // Step 4 & 5: Calculate and return the length of the last word
    return lastWord.length;
}

console.log(lengthOfLastWordTrimmed(" fly me to the moon ")); // Output: 4


// Example 3: Check if two strings are anagrams
// 1. Remove spaces and convert all letters to the same case
// 2. Sort the Characters
// 3. Compare Sorted Strings
// 4. Return the Result

function isAnagram(str1, str2) {
    // Step 1: Remove spaces and convert to lowercase
    const normalize = s => s.replace(/\s/g, '').toLowerCase();
    const s1 = normalize(str1);
    const s2 = normalize(str2);

    // Step 2: Sort the characters of each string
    const sorted1 = s1.split('').sort().join('');
    const sorted2 = s2.split('').sort().join('');

    // Step 3 & 4: Compare sorted strings and return the result
    return sorted1 === sorted2;
}

console.log(isAnagram('listen', 'silent')); // Output: true
console.log(isAnagram('hello', 'world'));   // Output: false
