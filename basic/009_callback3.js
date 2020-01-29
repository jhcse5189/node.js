function add(a, b, callback) {
    var result = a + b;
    callback(result);

    var count = 0; // as 'Closure'
    // When a function return with defining another function,
    var history = function() {
        ++count;
        return `${count}# ${a} + ${b} = ${result}`;
    }
    return history;
}

var add_history = add(10, 10, function(result) {
    console.log(`called callback function as parameter...`);
    console.log(`10 + 10 is ${result}`);
});

// accessing to variables in memory is allowed exceptionally.
console.log(`add_history(): ${add_history()}`);
console.log(`add_history(): ${add_history()}`);
console.log(`add_history(): ${add_history()}`);
