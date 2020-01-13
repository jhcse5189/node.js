var fibonacci = require("../fibonacci");
var assert = require("assert");

assert.equal(fibonacci.getFibonacci(10), 34, "Wrong fibonacci!");

/* if error occurred,

assert.js:92
  throw new AssertionError(obj);
  ^

AssertionError [ERR_ASSERTION]: Wrong fibonacci!
    at Object.<anonymous> (/home/quiltsewing/node.js/debugging/unit_test/assert/fibonacci-test.js:4:8)
    at Module._compile (internal/modules/cjs/loader.js:955:30)
    at Object.Module._extensions..js (internal/modules/cjs/loader.js:991:10)
    at Module.load (internal/modules/cjs/loader.js:811:32)
    at Function.Module._load (internal/modules/cjs/loader.js:723:14)
    at Function.Module.runMain (internal/modules/cjs/loader.js:1043:10)
    at internal/main/run_main_module.js:17:11 {
  generatedMessage: false,
  code: 'ERR_ASSERTION',
  actual: undefined,
  expected: 34,
  operator: '=='
}

*/