var CMModule = require("./CommandInterpreter");
console.log("hello there");

//CMModule.testCommandInterpreter();

var subject="My Special Google Drive Image|gdlink";
var body = "https://drive.google.com/open?id=1dmTDZrfnlbubxaRFSH21o2A3_TIsVvo_";
var body1 = "https://drive.google.com/open?i1d=1dmTDZrfnlbubxaRFSH21o2A3_TIsVvo_";
var body2 = "https://drive.google.com/open?id=1dmTDZrfnlbubxaRFSH21o2A3_TIsVvo_";

console.log("Test1*************************************")
CMModule.testSubjectBody (subject,body);
console.log("Test1*************************************")

console.log("Test2*************************************")
CMModule.testSubjectBody (subject,body1);
console.log("Test2*************************************")


console.log("done");

