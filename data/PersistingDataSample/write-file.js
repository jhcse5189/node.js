var fs = require('fs');

var data = "Node.js!";

fs.writeFile('persistData.txt', data, (err) => {
    if (err) throw err;
    console.log('Persist data in file successfully!');
});
