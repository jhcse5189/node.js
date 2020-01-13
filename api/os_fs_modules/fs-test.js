var fs = require("fs");

/* read */
// in Async.
fs.readFile("test.txt", "utf8", function(err, data) {
    if (err) throw err;
    console.log(data);
});
// in Sync.
var data = fs.readFileSync("test.txt", "utf8");
console.log(data);

/* exist */
// in Async.
fs.exists("test.txt", function(exists) {
    console.log("fs.exists: " + exists);
});
// in Sync.
var exists = fs.existsSync("test2.txt");
console.log("fs.existsSync: " + exists);

/* write */
// in Async.
fs.writeFile("message_async.txt", "Hello Node.js!", "utf8", function(err) {
    if (err) throw err;
    console.log("It's saved!");
});
// in Sync.
fs.writeFileSync("message_sync.txt", "Bye Node.js!", "utf8");
