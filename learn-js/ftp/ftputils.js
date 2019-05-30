
exports.isValid = isValid
exports.isValidObject=isValidObject
exports.isInvalidObject = function(obj) { return !(isValidObject(obj))}
exports.test=test

exports.isInValid = function (stringValue)
{
    return !(isValid(stringValue))
}

function isValid(stringValue) {
    if (stringValue == undefined)
    {
        return false;
    }
    if (stringValue == null)
    {
        return false;
    }
    if (typeof(stringValue) != "string")
    {
        return false;
    }
    if (stringValue.trim() == "")  
    {
        return false;
    }
    return true;
}//eof-function


function isValidObject(obj) {
    if (obj == undefined)
    {
        return false;
    }
    if (obj == null)
    {
        return false;
    }
    return true;
}//eof-function

function a(v1, v2) {
    if (v1 === v2)
    {
        console.log("passed");
        return;
    }
    console.log(`test failed. ${v1}:${v2}`);
}
function test()
{
    //Some tests
    let someUndefinedValue;
    a(false, isValid(someUndefinedValue));
    a(false, isValid(5));
    a(false,isValid(""));
    a(false,isValid("    "));
    a(true,isValid("hello"));

    //proper string
    a(true,isValid("  hello    "));

    //invalid null object
    let nullObj = null;
    a(false,isValidObject(nullObj));
    a(false,isValidObject(someUndefinedValue));

}

//test();
