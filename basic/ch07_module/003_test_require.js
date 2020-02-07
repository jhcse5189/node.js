/**
 * test module require for ./002_test_exports.js
 * 
 * @date 2020-02-07
 * @author bammer
 */

 const user01 = require('./002_test_exports');

 function showUser() {
    return `${user01.getUser().name}, ${user01.group.name}`;
 }

 console.log(`User Profile: ${showUser()}`);
