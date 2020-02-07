/**
 * import prototype object via require from ./011_mod_assign_prot.js
 * 
 * @date 2020-02-07
 * @author bammer
 */

const User = require('./011_mod_assign_prot'),
      user = new User('test01', 'bammer');

user.printUser();
