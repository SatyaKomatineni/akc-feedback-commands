

var aspire_gslistCommand = require("./gslistCommand");

module.exports.testCommandInterpreter = testCommandInterpreter;
module.exports.CommandInterpreter = CommandInterpreter;
module.exports.testSubjectBody = testSubjectBody;

function testCommandInterpreter()
{
    var subject="hello there|link";
    var body="Any body will do";

    //The following will 
    var newValues = new CommandInterpreter(subject,body);
    if (newValues.errorMessage != "")
    {
        dalert(newValues.errorMessage);
        return;
    }

    //there is no error
    dalert("New subject:" + newValues.newSubject);
    dalert("New body:" + newValues.newAppendText);
}

function testSubjectBody(subject, body)
{
	console.log("Testing with subject:" + subject);
	console.log("Testing with body:" + body);


    //The following will 
    var newValues = new CommandInterpreter(subject,body);
    if (newValues.errorMessage != "")
    {
        dalert(newValues.errorMessage);
        return;
    }

    //there is no error
    dalert("New subject:" + newValues.newSubject);
	dalert("New body:" + newValues.newAppendText);	
	dalert("Error:" + newValues.errorMessage);
}
/**
 * 
 * @param {String} inSubject 
 * @param {String} inAppendText 
 */
function CommandInterpreter(inSubject, inAppendText)
{
	this.newSubject="";
	this.newAppendText = "";
	this.command="";
	this.errorMessage="";
	
	var trimSubject = inSubject.trim();
	var trimAppendText = inAppendText.trim();
	
	//See if a command is present
	var subjectArray = inSubject.split("|");
	if (subjectArray.length <= 1)
	{
		//there is no command
		this.newSubject=trimSubject;
		this.newAppendText = trimAppendText;
		return;
	}
	//there is command
	this.command = subjectArray[1];
	this.newSubject = subjectArray[0];
	dalert('recognized command:' + this.command);
		
	//there is command
    commandfuncname = "aspire_" + this.command + "Command";

    //*************************************************
    //See if this works
    //This line is not there in original
    //*************************************************
    commandfuncname = commandfuncname + "." + commandfuncname;

	var funcobject;
	eval("funcobject = " + commandfuncname + ";");
	dalert(typeof(funcobject));
	if (typeof(funcobject) == "function")
	{
		//aspire_linkCommand(this.command, this.newSubject,trimAppendText,this);
		funcobject(this.command, this.newSubject,trimAppendText,this,inSubject,inAppendText);
	}
	else
	{
		this.errorMessage="Sorry, command not recognized:" + this.command;
	}
	return;
}

//command is available
//linkText : 1st argument or subject
//linkUrl: body text
//ci: command interpreter
function aspire_linkCommand(commandname, linkText, linkUrl, ci
			, completesubjectline
			, completeBody)
{
	dalert(linkText);
	dalert(linkUrl);
	
	if (linkText == "")
	{
		ci.errorMessage = "Subject is empty";
		return;
	}
	if (linkUrl == "")
	{
		ci.errorMessage = "A url is required for a link command";
		return;
	}
	
	var finalBody = '<p><a href="' + linkUrl + '">' + linkText + '</a></p>';
	dalert(finalBody);
	ci.newAppendText = finalBody;
	ci.newSubject = linkText;
}

function dalert(message)
{
    console.log(message);
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