// process events in module
// to avoid name collision
var Calc = require('./calc3');

var calc = new Calc();

console.log(`transfer stop event to ${Calc.title} in 2 seconds.`);
setTimeout(function() {
    calc.emit('stop');
}, 2000);
