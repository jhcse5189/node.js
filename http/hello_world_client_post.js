const http = require("http");

var options = {
    hostname: "127.0.0.1",
    port: 3000,
    path: "/",
    method: "POST"
};

var req = http.request(options, (res) => {
    console.log("STATUS: " + res.statusCode);
    console.log("HEADERS: " + JSON.stringify(res.headers));
    res.setEncoding("utf8");
    
    res.on("data", (chunk) => {
        console.log("BODY: " + chunk);
    });
});

req.on("error", (e) => {
    console.log("problem with request: " + e.message);
});
// write data to request body
req.write("data\n");
req.write("data\n");
req.end();
