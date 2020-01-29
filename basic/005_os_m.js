// about 'os' internal module
var os = require('os');

console.log(`platform of system: ${os.platform()}`);
console.log(`hostname of system: ${os.hostname()}`);
console.log(`memories of system: ${os.freemem()} / ${os.totalmem()}`);

console.log(`cpu info. of system:`);
console.dir(os.cpus());

console.log(`network interface info. of system:`);
console.dir(os.networkInterfaces());
