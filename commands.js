//************************************
//* 5/7/2018
//* This file is a command file
//* for providing feedback commands in akc.
//*
//* I am planning to use this as a separate github project
//* This will be a test ground 
//* Will use "vscode" as the primary editor and development environment
//*
//* Complete help on this file will be in a different file so as not to 
//* overwhelm this file.
//*************************************

function aspire_helpCommand(commandname, subject, body, ci
    , completesubjectline
    , completeBody)
{
var qhelp = "<pre><code>";
qhelp = qhelp + "\ncode\ncode1\nimages\nimage\nlink\nquestion\ngquestion\naquestion\nwhoareyou\ndict\nplist\nolist\nhelp";
qhelp = qhelp + "</code></pre>";

var baseurl="/akc/display?url=DisplayNoteIMPURL&reportId=3905&downerUserId=satya";
//body exists
var newbody = '<p><a href="' + baseurl + '">Click her to see full help</a></p>';
newbody = newbody + qhelp;
ci.newSubject=subject;
ci.newAppendText = newbody;
}


function aspire_whoareyouCommand(commandname, subject, body, ci
    , completesubjectline
    , completeBody)
{
var baseurl="http://www.satyakomatineni.com/akc/display?url=DisplayNoteBodyURL&reportId=2177&ownerUserId=satya";
//body exists
var newbody = '<p><a href="' + baseurl + '">Click her to see me</a></p>';
ci.newSubject=subject;
ci.newAppendText = newbody;
}

function aspire_code1Command(commandname, subject, body, ci
       , completesubjectline
       , completeBody)
{
if (body == "")
{
   ci.newSubject=subject;
   return;
}
//body exists
var newbody = body.replace(/</g,"&lt;");
newbody = newbody.replace(/>/g,"&gt;");
newbody = newbody.replace(/\t/g,"   ");
newbody = "<pre><code>\n" + newbody + "\n</code></pre>";
ci.newSubject=subject;
ci.newAppendText = newbody;
}

function aspire_replaceTabs(ins)
{
return ins.replace(/\t/g,"   ");
}

function aspire_googleCommand(commandname, subject, body, ci
    , completesubjectline
    , completeBody)
{
var baseurl="http://www.google.com/search?hl=en&q=" + escape(subject);
//body exists
var newbody = '<p><a href="' + baseurl + '">Search for:  ' + subject + '</a></p>'
ci.newSubject=subject;
ci.newAppendText = newbody;
}

function aspire_imagesCommand(commandname, subject, body, ci
    , completesubjectline
    , completeBody)
{
var baseurl="http://www.google.com/images?hl=en&q=" + escape(subject);
//body exists
var newbody = '<p><a href="' + baseurl + '">Show images for:  ' + subject + '</a></p>'
ci.newSubject=subject;
ci.newAppendText = newbody;
}

function aspire_imageCommand(commandname, linkText, linkUrl, ci
    , completesubjectline
    , completeBody)
{
dalert(linkText);
dalert(linkUrl);

if (linkText == "")
{
 this.errorMessage = "Subject is empty";
 return;
}
if (linkUrl == "")
{
 this.errorMessage = "A image url is required for a image command";
 return;
}

var finalBody = '<p><img src="' + linkUrl + '"/></p>';
dalert(finalBody);
ci.newAppendText = finalBody;
ci.newSubject = linkText;
}

function aspire_gquestionCommand(commandname, subject, body, ci
    , completesubjectline
    , completeBody)
{
var appendText = '<p class="question">' + subject + '</p>';

var baseurl="http://www.google.com/search?hl=en&q=" + escape(subject);
//body exists
var googleSearchUrl = '<p><a href="' + baseurl + '">Search for:  ' + subject + '</a></p>'

ci.newSubject=subject;
ci.newAppendText = appendText + "\n" + googleSearchUrl;
}

function aspire_aquestionCommand(commandname, subject, body, ci
    , completesubjectline
    , completeBody)
{
var appendText = '<p class="question">' + subject + '</p>';

ci.newSubject=subject;
ci.newAppendText = appendText 
    + "\n" + getGoogleText(subject)
    + "\n" + getAndroidDevelopersText(subject)
    + "\n" + getAndroidBeginersText(subject)
    + "\n" + getGoogleCodeText(subject)
    + "\n" + getAndroidIssuesText(subject)
    ;
}

function getGoogleText(subject)
{
var baseurl="http://www.google.com/search?hl=en&q=" + escape(subject);
var googleSearchUrl = '<p><a href="' + baseurl + '">Search Google for:  ' + subject + '</a></p>';
return googleSearchUrl;
}

function getAndroidDevelopersText(subject)
{
var baseurl="http://groups.google.com/group/android-developers/search?group=android-developers&q=" + escape(subject);
var searchUrl = '<p><a href="' + baseurl + '">Search Android Developers Group for:  ' + subject + '</a></p>';
return searchUrl;
}

function getAndroidBeginersText(subject)
{
var baseurl="http://groups.google.com/group/android-beginners/search?group=android-beginners&q=" + escape(subject);
var searchUrl = '<p><a href="' + baseurl + '">Search Android Beginers Group for:  ' + subject + '</a></p>';
return searchUrl;
}

function getGoogleCodeText(subject)
{
var baseurl="http://code.google.com/search/#p=android&q=" + escape(subject);
var searchUrl = '<p><a href="' + baseurl + '">Search Google Code for:  ' + subject + '</a></p>';
return searchUrl;
}

function getAndroidIssuesText(subject)
{
var baseurl="http://code.google.com/p/android/issues/list?can=2&colspec=ID+Type+Version+Security+Status+Owner+Summary&cells=tiles&q=" + escape(subject);
var searchUrl = '<p><a href="' + baseurl + '">Search Android Issues Database for:  ' + subject + '</a></p>'
return searchUrl;
}


/*
***************************************************
* Dictionary support
***************************************************
*/
function aspire_dictCommand(commandname, subject, body, ci
       , completesubjectline
       , completeBody)
{
if (body == "")
{
   ci.newSubject=subject;
   return;
}
//body exists
var newbody = aspire_getWordUrls(body);
newbody = '<div class="dictionary">\n' + newbody + '</div>\n';

ci.newSubject=subject;
ci.newAppendText = newbody;
}

function aspire_getWordUrls(body)
{
var lineArray=aspire_splitLines(body);
var newbody = "";

for(i=0;i<lineArray.length;i++)
{
  var line = lineArray[i];
  //line = line.trim();
  if (line != "")
  {
      newbody = newbody + aspire_getDictionaryUrl(line) + "\n";
  }         
  
}
return newbody;
}

function aspire_getDictionaryUrl(word)
{
var url = "http://www.webster-dictionary.org/definition/" + word;
var template = '<p><a href="' + url + '">' + word + '</a></p>';
return template;
}

function aspire_splitLines(body)
{
var lineArray = body.split('\n');
return lineArray;
}
/*
***************************************************
* OList
***************************************************
*/
function aspire_olistCommand(commandname, subject, body, ci
       , completesubjectline
       , completeBody)
{
if (body == "")
{
   ci.newSubject=subject;
   return;
}
//body exists
var newbody = aspire_getOListBody(body);
newbody = '<div class="olist">\n' + newbody + '</div>\n';

ci.newSubject=subject;
ci.newAppendText = newbody;
}

function aspire_getOListBody(body)
{
var lineArray=aspire_splitLines(body);
var newbody = "<ol>\n";

for(i=0;i<lineArray.length;i++)
{
  var line = lineArray[i];
  //line = line.trim();
  if (line != "")
  {
      newbody = newbody + aspire_getListLine(line) + "\n";
  }         
  
}
return newbody + "</ol>\n";
}

function aspire_getListLine(line)
{
var template = '<li>' + escapeSpecial(line) + '</li>';
return template;
}

/*
***************************************************
* PList
***************************************************
*/
function aspire_plistCommand(commandname, subject, body, ci
       , completesubjectline
       , completeBody)
{
if (body == "")
{
   ci.newSubject=subject;
   return;
}
//body exists
var newbody = aspire_getPListBody(body);
newbody = '<div class="plist">\n' + newbody + '</div>\n';

ci.newSubject=subject;
ci.newAppendText = newbody;
}

function aspire_getPListBody(body)
{
var lineArray=aspire_splitLines(body);
var newbody = "";

for(i=0;i<lineArray.length;i++)
{
  var line = lineArray[i];
  //line = line.trim();
  if (line != "")
  {
      newbody = newbody + aspire_getPListLine(line) + "\n";
  }         
  
}
return newbody;
}
function aspire_getPListLine(line)
{
var template = '<p>' + escapeSpecial(line) + '</p>';
return template;
}

function escapeSpecial(line)
{
var newline = line.replace(/</g,"&lt;");
newline = newline.replace(/>/g,"&gt;");
return newline;
}
