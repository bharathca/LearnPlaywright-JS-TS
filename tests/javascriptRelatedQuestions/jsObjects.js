//can js objects holds a function as a property ?

const person = {
    name: "John",
    age : 30,
    greet : function () {
        console.log("test "+this.name);
    }
}
console.log(person.name);
person.greet();