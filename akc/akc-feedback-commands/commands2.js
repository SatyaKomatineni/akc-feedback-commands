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


/**
* Google Drive link: gdlink
* 5/9/2018 
* 
* Converts from google drive image link
* https://drive.google.com/open?id=1dmTDZrfnlbubxaRFSH21o2A3_TIsVvo_
* 
* to blong publishable link
* https://drive.google.com/uc?id=1dmTDZrfnlbubxaRFSH21o2A3_TIsVvo_
* 
*/
function aspire_gdlinkCommand(commandname, subject, body, ci
, completesubjectline
, completeBody)
{
var gdriveSourceURL = body;

if (subject == "")
{
ci.errorMessage = "Subject is empty";
return;
}
if (gdriveSourceURL == "")
{
ci.errorMessage = "A google drive image url is required for this command";
return;
}

//subject is there
//image url is there
var targetGoogleDriveBaseURL = "http://drive.google.com/uc?id=";
var sourceGoogleDriveBaseURL = "https://drive.google.com/open?id=";

var fileIdIndex = gdriveSourceURL.indexOf("id=");
if (fileIdIndex == -1)
{
   //Cannot find the pattern
ci.errorMessage = "Does not match the google drive file open URL pattern";
return;
}
//pattern found
var fileId = gdriveSourceURL.substring(fileIdIndex + 3);
dalert(fileId);
if (fileId == "")
{
   ci.errorMessage = "File id not found";
   return;
}
//file id found
var targetGoogleDriveImageURL = targetGoogleDriveBaseURL + fileId;

//body exists
var finalBody = '<p><img src="' + targetGoogleDriveImageURL + '"/></p>';

ci.newSubject=subject;
ci.newAppendText = finalBody;
return;
}

/*
***************************************************
* glistCommand
* aspire_glistCommand
*
* Given the following
*
* Subject|gslit
* topic1
* topic2
* topic3
*
* will then produce
*

<div class="plist">
<p>Topic1:<a href="subject:topic1">Search On Web</a></p>
<p>Topic2:<a href="subject:topic2">Search On Web</a></p>
<p>Topic3:<a href="subject:topic3">Search On Web</a></p>
</div>

*
***************************************************
*/
function aspire_gslistCommand(commandname, subject, body, ci
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

//*******************************************
//inner function
//*******************************************
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
}//eof-function

//*******************************************
//inner function: form an html line given a line text
//*******************************************
function aspire_getPListLine(line)
{
   //var escapedLine = escapeSpecial(line);
   var template = '<p>' 
       + line 
       + ":"
       + getWebSearchSegment(line)
       + '</p>';
   return template;
}
function getWebSearchSegment(line)
{
   var googleSearchUrl = aspire_getGoogleSearchURL(subject + ":" + line);
   //Take the line and formulate a web search
   //<a href="">Search On Web</a>
   var newline = '<a href="'
       + googleSearchUrl
       + '">'
       + 'Search On Web</a>';
   return newline;
}

}//eof-parent function

//*******************************************************
//Add this function globally
//*******************************************************
function aspire_getGoogleSearchURL(line)
{
var baseurl="http://www.google.com/search?hl=en&q=" + escape(line);
return baseurl;
}
