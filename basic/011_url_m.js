var url = require('url');

// URL String to URL obj.
var curURL = url.parse('https://www.google.com/search?q=steve+jobs');

// URL obj. to URL String
var curStr = url.format(curURL);

console.log(`String: ${curStr}`);
console.log(curURL);

// div. request parameters
var querystring = require('querystring');
var param = querystring.decode(curURL.query);

console.log(param.q);
console.log(querystring.encode(param));
