
module.exports.aspire_gitimageCommand = aspire_gitimageCommand;

var fs = require('fs');
eval(fs.readFileSync('existing.js')+'');

/*
***************************************************
* gitimageCommand
* aspire_gitimageCommand
*
* Given the following
*
* Subject|gitimage
* git image url (body)
*
* will then produce the following (by adding ?raw=true)
*
* 

<div class="gitimage">
    <p><img src="https://github.com/SatyaKomatineni/aspire/blob/master/docs/architecture/aspire-app-objects-in-configfile.png?raw=true"/></p>
</div>

* Converts from git image link
* https://github.com/SatyaKomatineni/aspire/blob/master/docs/architecture/aspire-app-objects-in-configfile.png
* 
* to 
* https://github.com/SatyaKomatineni/aspire/blob/master/docs/architecture/aspire-app-objects-in-configfile.png?raw=true
*
***************************************************
*/
function aspire_gitimageCommand(commandname, subject, body, ci
    , completesubjectline
    , completeBody)
{
    if (body == "")
    {
        ci.newSubject=subject;
        return;
    }
    //body exists
    var newbody = aspire_getgitimageBody(body);
    newbody = '<div class="gitimage">\n' + newbody + '\n</div>\n';

    ci.newSubject=subject;
    ci.newAppendText = newbody;

    //*******************************************
    //inner function
    //should return the html for inside div
    //*******************************************
    function aspire_getgitimageBody(body)
    {
        var sourceGitImageURL = body;
        if (sourceGitImageURL == "")
        {
            ci.errorMessage = "A git image url is required for this command";
            return;
        }
        sourceGitImageURL = sourceGitImageURL.trim();
        var finalBody = '<p><img src="' + sourceGitImageURL + '?raw=true' + '"/></p>';
        return finalBody;
        
    }//eof-function
}//eof-parent function aspire_gitimageCommand