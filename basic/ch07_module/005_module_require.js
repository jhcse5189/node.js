/**
 * test require for ./004_module_exports.js
 * 
 * @date 2020-02-07
 * @author bammer
 */

 const user = require('./004_module_exports');

 function showUser() {
     return `${user.getUser().name}, ${user.group.name}`;
 }

 console.log(`User Profile: ${showUser()}`);
