/**
 * test module.exports for ./005_module_require.js
 * 
 * - assign js. obj. to module.exports directly
 * 
 * @date 2020-02-07
 * @author bammer
 */

let user = {
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

 module.exports = user;
