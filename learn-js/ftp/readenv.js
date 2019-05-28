

var u = require("./ftputils");

exports.createHostSpecFromEnv = createHostSpecFromEnv;

function createHostSpecFromEnv(name)
{
    this.name=name;

    let ipKey = "host_" + name + "_ip";
    let userKey = "host_" + name + "_user";
    let passKey = "host_" + name + "_password";

    this.ip = process.env[ipKey];
    this.user = process.env[userKey];
    this.password = process.env[passKey]

    if (u.isInValid(this.ip))
    {
        throw "ip address is not specified or empty"
    }

    if (u.isInValid(this.user))
    {
        throw "user is not specified or empty"
    }

    if (u.isInValid(this.password))
    {
        throw "user is not specified or empty"
    }

    //You can do this
    this.toString = function () {
        return this.ip + ";" + this.user + ";" + this.password;
    }

    //Or this arrow function convention
    this.toString1 =  () => {
        return this.ip + ";" + this.user + ";" + this.password;
    }
}

function test()
{
    //Don't forget the new. You will get odd results
    //otherwise
    let ftpHostSpec = new createHostSpecFromEnv("wu1");

    //prints the object as best as it can
    console.log(ftpHostSpec)

    //Calls toString() on the object
    //to convert it to a string first
    console.log("Spec:" + ftpHostSpec)
}