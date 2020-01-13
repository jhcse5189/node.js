var fibonacci = require("../fibonacci"),
    assert = require("assert");

describe("Getting Fibonacci Number >>", function() {
    describe("when trying to get fibonacci 8th number", function() {
        it("should return 13",
            function() {
                assert.equal(fibonacci.getFibonacci(8), 13, "Wrong fibonacci!");
            });
    });
    describe("when trying to get fibonacci 9th number", function() {
        it("should return 21",
            function() {
                assert.equal(fibonacci.getFibonacci(9), 21, "Wrong fibonacci!");
            });
    });
    describe("when trying to get fibonacci 10th number", function() {
        it("should return 34",
            function() {
                assert.equal(fibonacci.getFibonacci(10), 34, "Wrong fibonacci!");
            });
    });
});