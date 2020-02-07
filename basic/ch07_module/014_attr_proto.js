/**
 * import prototype object via require from ./013_mod_attr_proto.js
 * 
 * @date 2020-02-07
 * @author bammer
 */

const User = require('./013_mod_attr_proto').User,
      user = new User('test01', 'bammer');

user.printUser();
