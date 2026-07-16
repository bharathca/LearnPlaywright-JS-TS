//var is function scoped and as well as global scoped. Can be updated and redeclared
//If we did not mention what type of variable it is then by default it takes as "var"
//let is block scoped. Can be updated but cannot be redeclared with-in the same scope
//const is block scoped. Cannot be updated or redeclared
//const cannot be redeclared in the same scope.
// const can be declared again in a different block scope.

// | Keyword | Can declare without value? | Default value |
// |---|---:|---|
// | `let` | Yes | `undefined` |
// | `var` | Yes | `undefined` |
// | `const` | No | Not allowed |


function varExample() {
    var x = 1;
    if (true) {
        var x = 2;
        console.log("varExample: " + x); // 2 -> var is function scoped and as well as global scoped. Can be updated and redeclared
    }
    console.log("varExample: " + x); // 2
}
varExample();

function letExample() {
    let x = 1;
    if (true) {
        let x = 2;
        console.log("let Example: " + x); // 2 let is block scoped. Can be updated but cannot be redeclared with-in the same scope
    }
    console.log("let Example: " + x); // 1 //let is block scoped. Can be updated but cannot be redeclared with-in the same scope
}
letExample()

function constExample () {
    const x = 1; // function scope
    if (true) { 
        const x = 2; // if block scope so no error
        console.log("const Example: " + x); // 2 //const is block scoped. Cannot be updated or redeclared
    }
    console.log("const Example: " + x); // 1 //const is block scoped. Cannot be updated or redeclared
}
constExample();