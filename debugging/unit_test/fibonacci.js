function getFibonacci(total) {
    
    var results = [ 0, 1 ];

    for ( var i = 0; i < total; i++ ) {
        if (i >= 2) {
            results.push(results[i - 2] + results[i - 1]);
        }
    }

    return results[total - 1];
}

module.exports.getFibonacci = getFibonacci;