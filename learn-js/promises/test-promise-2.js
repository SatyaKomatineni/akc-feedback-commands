function beginTest(name)
{
    console.log("*************************************************")
    console.log("* " + name);
    console.log("*************************************************")
}

beginTest("Test 1: Async with no await");

//***********************************************
//Lets create promise
//***********************************************
console.log("1. Create a promise");
let x = new Promise((resolve, reject) => {
    console.log("1. before resolving the promise");
    //return "value X"
    console.log("1. Resolve the promise. right away");
    resolve("Value of X");
})

//***********************************************
//A simple function that returns a value
//to see what async does with it without an await
//***********************************************
async function af1()
{
    console.log("1. executing async af1 function body");
    return "hello"
}

/**
 * what to test:
 * 
 * 1. async af1 returns a promise
 * 2. Being async, is the function executed right away? (yes)
 * 3. is the returned promise also resolved right away? (yes)
 * 
 */

console.log("\n1. Call the async function af1, that doesn't rely on await");
let promiseofAf1 = af1();

console.log("\n2. after call to async inline")

 //It appears in this case the promise is also resolved
console.log("2. Examine the promise returned by the async function")
console.log(promiseofAf1)
 
 /**
  * Test2: Behavior of async with await
  * ***************************************************
  * 1. How does async behave with await
  * 2. what is the syntax of await
  * 3. what does an await return? A promise? (no. Actual result)
  * 4. what executes before await and what executes after
  * 5. how do you work with what is returned from an async function
  * 6. Diff between the then of await and the async
  * 7. await does not return a promise
  * 8. The then of the async and the then of the await are different
  * 
  */

 
  beginTest("Test 2: Behavior of Async with Await")
  async function af2()
  {
      //see if this gets executed
      console.log("1. start af2, the part of function before await");
      console.log("1. await invoked with a result coming back");

      //wait on a promise
      let result = await x

      console.log("3. after await. These will be executed later")
      console.log("3. what is returnded from await");
      console.log("3. Type of Result is" + typeof(result));
      console.log(result);
      return "return from af2"
  }

  let af2Promise  = af2();

  console.log("2. inline code after calling af2. Before af2 finishes");
  console.log("2. af2Promise that is returned from af2");
  console.log(af2Promise);

  af2Promise.then((result)=>{
      console.log("4. After af2Promise complete. the Result of the af2");
      console.log(result);
  })

  console.log("2. See promise X. The promise that af2 is waiting on");
  console.log(x);
  