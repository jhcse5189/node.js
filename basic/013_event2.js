// user defined event,
process.on('tick', function(count) {
    console.log(`tick event emitted: ${count}`);
});

console.log('transfer tick event in 2 seconds.');
setTimeout(function() {
    // can be transfer by emit
    process.emit('tick', '2');
}, 2000);
