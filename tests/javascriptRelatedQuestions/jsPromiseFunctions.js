function fetchData() {
    //promise has three -> resolved, pending, rejected
    return new Promise((resolve) => {
        setTimeout(() => {
            console.log("Getting the data from the server");
            const data = "Hello I am back";
            resolve(data);
        }, 2000)
    })
}

fetchData().then(function (data) {
    console.log("Processing the data: " + data)
})
// //using Await 
// await function fetchDataAwait() {
//     setTimeout(() => {
//         console.log("Getting the data from the server");
//         const data = "Hello I am back";
//         resolve(data);
//     }, 2000)
// }


// //await is there 
// const data = fetchDataAwait();
// console.log("Processing the data through await: "+data);