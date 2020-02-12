/**
 * route_loader.js
 * 
 * @date 2020-02-11
 * @author Bammer
 */

const config = require('../config');

var route_loader = {};


route_loader.init = function(app, router) {
    console.log(`call route_loader.init()`);
    return initRoutes(app, router);
}

// process routing info. defined in route_info.js
function initRoutes(app, router) {

    var infoLen = config.route_info.length;
    console.log(`N of route info. in config.js: ${infoLen}`);

    for (var i = 0; i < infoLen; ++i) {
        var curItem = config.route_info[i];

        // import module from file
        var curModule = require(curItem.file);

        // process routing info.
        if (curItem.type == 'get') {
            router.route(curItem.path).get(curModule[curItem.method]);
        } else if (curItem.type == 'post') {
            router.route(curItem.path).post(curModule[curItem.method]);
        } else {
            router.route(curItem.path).get(curModule[curItem.method]);
        }
    }

    // register a router obj. to app obj.
    app.use('/', router);
}

module.exports = route_loader;
