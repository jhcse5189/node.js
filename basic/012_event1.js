// process obj already get inheritanced EventEmitter internally
// therefore it can use .on, .emit method
process.on('exit', function() {
    console.log('exit event emitted.');
});

console.log('system exit in 2 seconds.');
setTimeout(function() {
    process.exit();
}, 2000);
