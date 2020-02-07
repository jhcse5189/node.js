/**
 * define own require method
 * 
 * @date 2020-02-07
 * @author bammer
 */

var require = function(path) {
    var exports = {
        getUser: function() {
            return {
                id: 'test01',
                name: 'bammer',
            };
        },
        group: {
            id: 'group01',
            name: 'friends',
        },
    }

    return exports;
}

var user = require('...');

function showUser() {
    return `${user.getUser().name}, ${user.group.name}`;
}

console.log(`User Profile: ${showUser()}`);
