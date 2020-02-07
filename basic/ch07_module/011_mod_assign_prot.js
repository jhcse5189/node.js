/**
 * assign prototype object to module.exports for ./012_assign_prot.js
 * 
 * @date 2020-02-07
 * @author bammer
 */

// constructor function
function User(id, name) {
    this.id = id;
    this.name = name;
}

User.prototype.getUser = function() {
    return {
        id: this.id,
        name: this.name
    };
}

User.prototype.group = {
    id: 'group01',
    name: 'friends',
}

User.prototype.printUser = function() {
    console.log(`User Name: ${this.name}\nGroup Name: ${this.group.name}`);
}

module.exports = User;
