
exports.isValid = isValid

exports.isInValid = function (stringValue)
{
    return !(isValid(stringValue))
}

function isValid(stringValue) {
    if (typeof(stringValue) == undefined)
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


function test()
{
    //Some tests
    let someUndefinedValue;
    console.log(isValid(someUndefinedValue));

    console.log(isValid(5));

    console.log(isValid(""));
    console.log(isValid("    "));

    //proper string
    console.log(isValid("hello"));

    //proper string
    console.log(isValid("  hello    "));
}