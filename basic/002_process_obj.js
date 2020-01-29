/* about global object: process */

// argv attr.
console.log(`the number of argv attr: ${process.argv.length}`);
console.dir(process.argv); // argv attr. is array obj.

// execute with port number -> node 002_process_obj.js 3000
if (process.argv.length > 2) {
    console.log(`third parameter value of argv: ${process.argv[2]}`);
}

process.argv.forEach((item, index) => {
    console.log(`${index} : ${item}`);
});

// env attr.
console.dir(process.env); // contains only user variables,
                          // can't access to system variables.
