var util = require('util');
var EventEmitter = require('events').EventEmitter;

var Calc = function() {
    var self = this;

    this.on('stop', function() {
        console.log('stop event emitted.');
    });
}

util.inherits(Calc, EventEmitter);
Calc.prototype.add = (a, b) => a + b;

module.exports = Calc;
module.exports.title = 'calculator';
