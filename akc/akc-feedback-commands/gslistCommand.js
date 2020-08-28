
module.exports.aspire_gslistCommand = aspire_gslistCommand;

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

//*******************************************************
//* These exist before
//*******************************************************
function escapeSpecial(line)
{
    var newline = line.replace(/</g,"&lt;");
    newline = newline.replace(/>/g,"&gt;");
    return newline;
}

function aspire_splitLines(body)
{
    var lineArray = body.split('\n');
    return lineArray;
}
