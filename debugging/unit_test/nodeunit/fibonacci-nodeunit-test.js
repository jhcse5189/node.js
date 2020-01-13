var fibonacci = require("../fibonacci");

exports.testGetFibonacci = function(test) {
    test.expect(3);
    test.equal(fibonacci.getFibonacci(8), 13, "Wrong fibonacci! 8th fibonacci is 13!");
    test.equal(fibonacci.getFibonacci(9), 21, "Wrong fibonacci! 9th fibonacci is 21!");
    test.equal(fibonacci.getFibonacci(10), 34, "Wrong fibonacci! 10th fibonacci is 34!");
    test.done();
};

/* Usage:: nodeunit __filename.js */