// js obj can be made by function,
// because function is also obj.

// as constructor
function Person(name, age) {
    this.name = name;
    this.age = age;
}

// Person obj as to make instance obj by new,
// not for containing real data.
Person.prototype.walk = function(speed) {
    console.log(`walk in ${speed}km/h ...`);
}

var person1 = new Person('bammer', 22),
    person2 = new Person('zipdory', 22);

person1.walk(10);

// therefore, Person obj is 'Prototype' obj,
// because it intend to make instance obj.
