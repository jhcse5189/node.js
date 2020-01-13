var fibonacci = require("../fibonacci"),
    assert = require("assert"),
    vows = require("vows");

vows.describe("Getting Fibonacci Number").addBatch({
    'when trying to get fibonacci 9th number': {
        topic: fibonacci.getFibonacci(9),
        'they should be equal': function (topic) {
            assert.equal(topic, 21, 'Wrong fibonacci! 9th fibonacci number is 21!');
        }
    },
    'when trying to get fibonacci 10th number': {
        topic: fibonacci.getFibonacci(10),
        'they should be equal': function (topic) {
            assert.equal(topic, 34, 'Wrong fibonacci! 10th fibonacci number is 34!');
        }
    }
}).run();

/* Usage:: node __filename.js */