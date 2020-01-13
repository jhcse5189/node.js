const ee = require("events");

exports.obj = new ee.EventEmitter();
exports.obj.sum = function(x, y) { return x + y; }
