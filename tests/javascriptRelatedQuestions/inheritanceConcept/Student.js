const Person = require("./Person");

class Student extends Person {
    constructor(name, age, grade) {
        super(name, age);
        this.grade = grade;
    }

    getStudentDetails() {
        const personDetails = super.getPersonDetails();
        return `${personDetails},  Grade: ${this.grade}`;
    }
}

module.exports = Student;