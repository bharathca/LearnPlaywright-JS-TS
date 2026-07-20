const students = [{ name: "Alice", score: 45 },
{ name: "Bhargav", score: 50 },
{ name: "Dhruvee", score: 60 },
{ name: "Bharath", score: 59 },
{ name: "J", score: 40 },
{ name: "K", score: 80 },
];

//Filter
const passedStudents = students.filter(student => student.score >= 36);
console.log("Passed Students: " + passedStudents);

//uppercase using map
const upperCaseNames = passedStudents.map(studentDetails => studentDetails.name.toUpperCase());
console.log("UpperCase Names Students: " + upperCaseNames);

//consolidate all the marks using reduce method
const totalScore = passedStudents.reduce((accumulator, student) => accumulator += student.score, 0)
console.log("Consolidated Marks: " + totalScore);


//second example for reduce - to find the maximum in the given array
const numbers = [10, 5, 20, 8];
const maximumNumber = numbers.reduce((accumulator, num) => num > accumulator ? num : accumulator, numbers[0]);
console.log("Maximum Number in the given array: " + maximumNumber)

//third example for reduce - count for each fruit in the array
const fruits = ["apple", "mango", "banana", "orange", "apple", "banana"];
const count = fruits.reduce((accumulator, fruit) => {
    accumulator[fruit] = (accumulator[fruit] || 0) + 1;
    return accumulator;
}, {});
console.log(count);