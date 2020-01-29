const fs = require('fs');

const inname = './output.txt';
const outname = './output2.txt';

fs.access(outname, function(err) {

    if (!err) {
        fs.unlink(outname, function(err) {
            if (err) throw err;
            console.log(`delete existing ${outname}`);
        });   
    }
    var infile = fs.createReadStream(inname);
    var outfile = fs.createWriteStream(outname);
    
    // just pipe streams, copy!
    infile.pipe(outfile);
    console.log(`copy ${inname}->${outname}`);
});
