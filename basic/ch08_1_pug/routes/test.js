/**
 * routing module to test
 */

var test1 = function(req, res) {
    console.log(`called test1 function in module 'test'`);

    res.writeHead(200, {'Content-Type':'text/html; charset=utf8'});

    var context = {};
    req.app.render('test1_success', context, function(err, html) {

        console.log(`rendered: ${html}`);
        res.end(html);
    });
}

module.exports.test1 = test1;
