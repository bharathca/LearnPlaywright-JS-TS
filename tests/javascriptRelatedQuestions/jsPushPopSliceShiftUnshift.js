//Arrays examples and operations


//Define an array 
const fruits = [ "Apple", "Banana", "Mango", "Cherry", "Date"];

//Access elements by index
console.log("Access elements by index - 0 - " + fruits[0]); //Access elements by index - 0 - Apple
console.log("Access elements by index - 3 - " + fruits[3]); //Access elements by index - 3 - Cherry

//Add element to the end of the array 
console.log("Before adding the fruit: "+fruits); //Before adding the fruit: Apple,Banana,Mango,Cherry,Date
console.log("Array size before push: "+fruits.length); //Array size before push: 5
fruits.push("Elderberry");
console.log("After adding the fruit: "+fruits); //After adding the fruit: Apple,Banana,Mango,Cherry,Date,Elderberry
console.log("Array size after push: "+fruits.length); //Array size after push: 6

//Remove the last element from the array
console.log("Before removing the fruit: "+fruits); //Before removing the fruit: Apple,Banana,Mango,Cherry,Date,Elderberry
console.log("Array size before pop: "+fruits.length); //Array size before push: 6
fruits.pop();
console.log("After removing the fruit: "+fruits); //After removing the fruit: Apple,Banana,Mango,Cherry,Date
console.log("Array size after pop: "+fruits.length); //Array size after push: 5

//Add an element at the beginning of the array 
console.log("Before adding the fruit at the beginning of the array : "+fruits); //Before adding the fruit: Apple,Banana,Mango,Cherry,Date
console.log("Array size before unshift: "+fruits.length); //Array size before push: 5
fruits.unshift("Elderberry");
console.log("After adding the fruit at the beginning of the array: "+fruits); //After adding the fruit: Elderberry,Apple,Banana,Mango,Cherry,Date
console.log("Array size after unshift: "+fruits.length); //Array size after push: 6

//Remove the first element from the array
console.log("Before removing the fruit from the beginning of the array: "+fruits); //Before removing the fruit: Elderberry,Apple,Banana,Mango,Cherry,Date
console.log("Array size before shift: "+fruits.length); //Array size before push: 6
fruits.shift();
console.log("After removing the fruit from the beginning of the array: "+fruits); //After removing the fruit: Apple,Banana,Mango,Cherry,Date
console.log("Array size after shift: "+fruits.length); //Array size after push: 5


//To find the index of an element
console.log("To find the index of an element: Mango " +fruits.indexOf("Mango"));

//remove the element from the array using the index
console.log("Fruits before removing the index of 2 from position 1 "+fruits)
fruits.splice(2); //or fruits.splice(0,2); -> 0 start and 2 is ending meaning Starts from apple and ends by mango these will be removed
console.log("Fruits after removing the index of 2 from position 1 "+fruits)


//ForEach - Iterate over an array 
fruits.forEach((fruit, index) => {
    console.log(`${index}: ${fruit}`);
});

fruits.forEach(fruit => {
     console.log(`${fruit}`); //This uses a template literal. It converts fruit into a string. if we use 10 in an array which is a number but to print it as a string we can use this
     //is useful when you want to combine text: console.log(`Fruit name is ${fruit}`);
});
fruits.forEach(fruit => {
     console.log(fruit); // This prints the value as it is. For strings, no visible difference.
     //For only printing the variable, prefer: -> console.log(fruit);
});