
/**
 * What does this demonstrate
 * **************************************
 * 1. Create a basic promise
 * 2. See what kind of a variable is created on a new promse
 * 3. basic Syntax of Promise
 * 4. Understand execution timing and order of executor function
 * 5. Understand execution timing and order of the then
 * 6. See that the "then" function is executed in the event loop
 * 
 * 
 * What gets printed from this is as follows:
 * **********************************************
 * 1. before resolve
 * 2. inline after promise
 * 3. Printing the promis variable[object Promise]
 * 4. Inside then function. Happens as an event loop
 * 
 */


let x = new Promise((resolve, reject) => {
    //Executor funciton. Executed immediately
    console.log("1. before resolve");

    //The value of the promise will be this
    //value that is passed to the resolve function
    resolve("Resolved Value");
})

//Undestand execution order
console.log("2. inline after promise");

//Examine in what order is the 
//code executed here in "then"
x.then(()=>{
    console.log("4. Inside then function. Happens as an event loop")
})


//See how the promise gets printed
console.log("3. Printing the promis variable" + x);