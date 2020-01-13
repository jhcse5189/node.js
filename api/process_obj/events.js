/* Event handling

register: addListener, on
delete  : removeListener, removeAllListeners 
emit    : emit

*/

var eObj = require("./eventObj");

eObj.obj.on("test", function() {
    console.log("test");
});

console.log(eObj.obj.sum(5, 6));
eObj.obj.emit("test");
