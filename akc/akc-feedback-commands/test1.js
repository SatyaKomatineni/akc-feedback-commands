var CMModule = require("./CommandInterpreter");
console.log("hello there");

//CMModule.testCommandInterpreter();


var subject="Concepts in VSCode|gslist";
var body = 
    "Open Editors" 
    + "\nWork Spaces"
    + "\nGitLens"

CMModule.testSubjectBody (subject,body);

console.log("done");

/******************
 * will produce the following
 * 

 <div class="plist">
<p>Open Editors:<a href="http://www.google.com/search?hl=en&q=Concepts%20in%20VSCode%3AOpen%20Editors">Search
On Web</a>

<p>Work Spaces:<a href="http://www.google.com/search?hl=en&q=Concepts%20in%20VSCode%3AWork%20Spaces">Search On Web</a>

<p>GitLens:<a href="http://www.google.com/search?hl=en&q=Concepts%20in%20VSCode%3AGitLens">Search On Web</a>
</div>

*****************/


