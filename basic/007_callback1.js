function add(a, b, callback) {
    console.log(`In-Progress ${a} + ${b} operation...`);
    var result = a + b;
    console.log('...Done!');
    callback(result);
}

add(10, 10, function(result) {
    console.log(`called callback function as parameter...`);
    console.log(`10 + 10 is ${result}`);
});
