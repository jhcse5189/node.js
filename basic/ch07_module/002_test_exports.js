/**
 * test module exports for ./003_test_require.js
 * 
 * - add method & obj to exports obj. attr.
 * 
 * @date 2020-02-07
 * @author bammer
 */

exports.getUser = function() {
    return {id: 'test01', name: 'bammer'};
}

exports.group = {id: 'group01', name: 'friends'};
