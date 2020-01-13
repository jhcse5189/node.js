var url  = require("url"),
    util = require("util"),
    net  = require("net");

var obj = url.parse("https://www.google.com/search?rlz=1C1SQJL_koKR862KR862&sxsrf=ACYBGNTmKVHBlsI6MZpwiFkhI5Kcv-5M0A%3A1578939568131&ei=sLQcXufOB5X4hwPq6KvQDQ&q=node+js&oq=node+js&gs_l=psy-ab.3..35i39i19l2j0j0i131j0l6.1179.2320..2521...1.0..0.115.888.0j8......0....1..gws-wiz.....10..0i203j0i30j0i8i30j35i362i39j35i39j0i67j0i20i263j0i131i20i263.wl9uZvcvinE&ved=0ahUKEwjn5tGgmIHnAhUV_GEKHWr0CtoQ4dUDCAs&uact=5");
console.log("url to Object: ", obj);
console.log("Object to url: ", url.format(obj));

var data = util.format("%s, %d, %j", "foo", 10, { name: "node.js" });
util.log(data);

// connection listener
var server = net.createServer(function(c) {
    console.log("server connected");
    c.on("end", () => {
        console.log("server disconnected");
    });
    c.write("hello\r\nThis is My Telnet Service:)\r\n");
    c.pipe(c);
});

// listening listener
server.listen(8124, ()=> {
    console.log("server bound");
});
