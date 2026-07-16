//Callback function is passed as an argument to another function and gets executed after some operation has been completed. 
//They are often used for asynchronous operations


function fetchData (callback) { //callback is nothing but processData/modifyData function. so once the fetch data is completed then the callback will be called 
    //example fetching data from the server
    setTimeout(()=> {
        console.log("Getting the data from the server");
        const data = "Hello I am back";
        callback(data);
    },2000)
}

function processData(data) {
    console.log("Processing Data: "+data);
}

function modifyData(data) {
    console.log("Modifying data: "+data);
}

fetchData(processData);
fetchData(modifyData);

//Output
/* Getting the data from the server
Processing Data: Hello I am back
Getting the data from the server
Modifying data: Hello I am back */