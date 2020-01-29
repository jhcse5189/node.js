var output = 'Hi...?';

// buffer with size only, .write string after
var buffer1 = new Buffer(10);
var len = buffer1.write(output, 'utf8');
console.log(`buffer1.toString(): ${buffer1.toString()}`);

// buffer with string
var buffer2 = new Buffer('Hi!', 'utf8');
console.log(`buffer2.toString(): ${buffer2.toString()}`);

// check type
console.log(`Buffer.isBuffer(buffer1): ${Buffer.isBuffer(buffer1)}`);

// string data in buffer obj to string variables
var byteLen = Buffer.byteLength(output);
var str1 = buffer1.toString('utf8', 0, byteLen),
    str2 = buffer2.toString('utf8');

// copy string of buf1 to buf2
buffer1.copy(buffer2, 0, 0, len);
console.log(`buffer2.toString('utf8'): ${buffer2.toString('utf8')}`);

// concatenate two buffers
var buffer3 = Buffer.concat([buffer1, buffer2]);
console.log(`buffer3.toString('utf8'): ${buffer3.toString('utf8')}`);
