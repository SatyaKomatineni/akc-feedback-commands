
module.exports.aspire_gdlink2Command = aspire_gdlink2Command;

var fs = require('fs');
eval(fs.readFileSync('existing.js')+'');

/*
***************************************************
* gdlink2Command
* aspire_gdlink2Command
*
* Given the following
*
* Subject|gdlink2
* (new google drive image url)
*
* will then produce
*
* 

<div class="gdlink2">
    <p><img src="http://drive.google.com/uc?id=1Lkx9qP6DcS9Pb7vadyfxkaSdsobziRkW"/></p>
</div>

* Converts from google drive image link
* https://drive.google.com/file/d/1Lkx9qP6DcS9Pb7vadyfxkaSdsobziRkW/view?usp=sharing
* 
* to blog publishable link
* https://drive.google.com/uc?id=1Lkx9qP6DcS9Pb7vadyfxkaSdsobziRkW
*
***************************************************
*/
function aspire_gdlink2Command(commandname, subject, body, ci
    , completesubjectline
    , completeBody)
{
    if (body == "")
    {
        ci.newSubject=subject;
        return;
    }
    //body exists
    var newbody = aspire_getGdlink2Body(body);
    newbody = '<div class="gdlink2">\n' + newbody + '\n</div>\n';

    ci.newSubject=subject;
    ci.newAppendText = newbody;

    //*******************************************
    //inner function
    //should return the html for inside div
    //*******************************************
    function aspire_getGdlink2Body(body)
    {
        var gdriveSourceURL = body;

        if (gdriveSourceURL == "")
        {
            ci.errorMessage = "A google drive image url is required for this command";
            return;
        }

        //https://drive.google.com/file/d/1Lkx9qP6DcS9Pb7vadyfxkaSdsobziRkW/view?usp=sharing
        var targetGoogleDriveBaseURL = "http://drive.google.com/uc?id=";
        var sourceGoogleDriveBaseURL = "https://drive.google.com/file/d/";
        
        var fileIdIndex = gdriveSourceURL.indexOf(sourceGoogleDriveBaseURL);
        if (fileIdIndex == -1)
        {
            //Cannot find the pattern
            ci.errorMessage = "Does not match the google drive file open URL pattern";
            return;
        }

        var fileIdStartIndex = fileIdIndex + sourceGoogleDriveBaseURL.length;
        var fileIdEndIndex = gdriveSourceURL.indexOf("/view",fileIdStartIndex);

        if (fileIdEndIndex == -1)
        {
            //Cannot find the pattern
            ci.errorMessage = "Does not match the google drive file open URL pattern";
            return;
        }
        var fileid = gdriveSourceURL.substring(fileIdStartIndex,fileIdEndIndex);

        var finalBody = '<p><img src="' + targetGoogleDriveBaseURL + fileid + '"/></p>';
        return finalBody;
        
    }//eof-function
}//eof-parent function aspire_gdlink2Command