//Define the class with the name Person
class Person {
     constructor(name, age) {
        this.name = name;
        this.age = age;
     }
     //This method is used to fetch the details of the person such as name and age
     getPersonDetails() {
        return `${this.name}, ${this.age}`;
     }
}
//export the person class
module.exports = Person;