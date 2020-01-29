/* about global object: console */
let result = 0;
console.time('duration_sum');

for (var i = 1; i <= 10000; ++i) {
    result += i;
}

console.timeEnd('duration_sum');
console.log(`result: ${result}`);

// global variables: __dirname, __filename, ...
console.log(`__dirname:\t${__dirname}`);
console.log(`__filename:\t${__filename}`);

// dir method: print attributes of js obj.
let person = {name: 'bammer', age: '22'};
console.dir(person);
