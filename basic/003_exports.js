// use exports global object (./calc/index.js)
var calc = require('./calc');
console.log(`calc.add(10, 10): ${calc.add(10, 10)}`);

// use module.exports (./calc2/index.js)
var calc2 = require('./calc2');
console.log(`calc2.add(10, 10): ${calc2.add(10, 10)}`);
