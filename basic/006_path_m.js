var path = require('path');

// join dir path name
var dirs = ['home', 'quiltsewing', 'node.js'];
var nodejsDir = dirs.join(path.sep);
console.log(`node.js Directory: ${nodejsDir}`);

// join dir path and file name
var paths = path.join(`/home/quiltsewing`, `avi.avi`);
console.log(`file path: ${paths}`);

// distinguish between dir and file name
var currentPath = __filename;
var dirname = path.dirname(currentPath);
var basename = path.basename(currentPath);
var extname = path.extname(currentPath);

console.log(`dir: ${dirname}\nfile: ${basename}\next: ${extname}`);
