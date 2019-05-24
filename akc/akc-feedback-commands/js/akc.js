function gotoPrint(ownerUserId, reportId)
{
	url = "/akc/servlet/DisplayServlet?url=DisplayNoteURL";
	url += "&ownerUserId="+ownerUserId;
	url += "&reportId=" + reportId;
	document.location=url;
}

function gotoBlogs(ownerUserId)
{
	url = "/akc/servlet/DisplayServlet?url=BlogsURL";
	url += "&ownerUserId=" + ownerUserId;
	url += "&publicitemsloop_controlstring=1,30";
	document.location=url;
}

function gotoLib(ownerUserId)
{
	url = "/akc/servlet/DisplayServlet?url=ShowFiledReportsViewJSPURL";
	url += "&ownerUserId=" + ownerUserId;
	document.location=url;
}
function gotoFolder(ownerUserId, folderName)
{
	url = "/akc/servlet/DisplayServlet?url=NotesMPURL";
	url += "&ownerUserId=" + ownerUserId;
	url += "&folderName=" + escape(folderName);
	document.location=url;
}
function saveNote(notename, foldername, whereToGo)
{
	var report_short_name = escape(notename);
	var report_long_name = escape(notename);
	var report_description = "<p>" + escape(notename) + "</p>";
	var url="none";
	var sqlStatement=report_description;
	var requestName = "saveSQLReport";
	
	var requestUrl = "/akc/update?request_name=" + requestName;
	requestUrl += "&report_short_name=" + report_short_name;
	requestUrl += "&report_long_name=" + report_long_name;
	requestUrl += "&report_description=" + report_description;
	requestUrl += "&sqlStatement=" + sqlStatement;
	
	//file it in folder
	requestUrl += "&folderName=" + escape(foldername);
	
	//after update go to
	requestUrl += "&aspire_target_url_key=gotoFolderView";
	
	//alert(requestUrl);
	document.location=requestUrl;
}

function gotoGenericPrint()
{
	url = document.location;
	url += "&masterpageCache=no&masterpagename=print_master_page&printmode=true";
	//alert(url);
	document.location=url;
}
function gotoGenericPrintIMP()
{
	url = document.location;
	url += "&masterpageCache=no&masterpagename=print_master_page&printmode=true";
	url += "&aspire_masterpageurl=printMPURL";
	//alert(url);
	document.location=url;
}