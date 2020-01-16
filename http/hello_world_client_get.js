const http = require("http");

// Protocol "https:" not supported. Expected "http:"
http.get("http://www.google.com/", (res) => {
    console.log("Got response: " + res.statusCode);
    }).on("error", (e) => {
        console.log("Got error: " + e.message);
});
