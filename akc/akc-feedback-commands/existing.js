//String functions
function isInValidString(s)
{
	return !isValidNonEmptyString(s);
}
function isValidString(s)
{
	return isValidNonEmptyString(s);
}
function isValidNonEmptyString(s)
{
	if (s == "")
	{
		//s is either undefined or null or if string empty
		return false;
	}
/*	
	//Assume s is a string
	var ns = s.trim();
	if (ns == "")
	{
		return false;
	}
*/	
	return true;
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

//*******************************************************
//Add this function globally
//*******************************************************
function aspire_getGoogleSearchURL(line)
{
    var baseurl="http://www.google.com/search?hl=en&q=" + escape(line);
    return baseurl;
}
