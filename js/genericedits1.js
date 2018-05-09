function setSelectOption(theSelect, theValue)
 {
   for (var i = 0; i < theSelect.length; i++)
    {
       if (theSelect.options[i].value == theValue)
        {
          theSelect.selectedIndex = i;
          return;
        }
    }
   theSelect.selectedIndex = 0;
   return;
 }
//************************************************
// getSelectedCheckBoxColumnValues
//
// inputs: 	form - A form object
//		colName - Name of the hidden field  that you want to mine
//		sep - A separator string such as , or |
// what does it do:
// 	1. Expects every checkbox to be named as: 1,2,3,4..
//	2. Expects a hidden field for every checkbox name: r1_coname, r2_colname
//	3. For every check box that is checked, it will collect the values for those hidden fields
//	4. For ex: if checkbox "2" is checked then "r2_colname' will be mined
//	5. Mined column values will be returned as val1|val2|val3
// Limitations
//	1. Doesn't work very well if a certain field is empty
//	2. Recommendation would be to use something like "None" or "Empty" to recognize these fields
//	3. Does not allow anyother checkboxes in the form
// Remedies
// 	1. Use instead one of the following functions
//	2. getSelectedCheckBoxHiddenValues
//	3. getSelectedColumnValues
// comments:
//
//		deprecated
//		Use instead getSelectedCheckBoxHiddenValues
//		or getSelectedCheckBoxValues
//******************************************************
function getSelectedCheckBoxColumnValues(form, colName, sep)
{
	var selectedUsers = "";
	elementArray = form.elements;
	for(i=0;i<elementArray.length;i++)
	{
		element = elementArray[i];
		if (element.type == "checkbox")
		{
			if (element.checked == true)
			{
//				alert("here");

				// Let's get the value of the column
				checkBoxName = element.name;

				// There must be an input hidden field with this name
				// checkBoxName_colName
				colFieldName = "form.r" + checkBoxName + "_" + colName;
//				alert("colFieldName:" + colFieldName);
				
				var colField = eval(colFieldName);
				colFieldValue = colField.value;
//				alert("colFieldValue" + colFieldValue);

				if (selectedUsers != "")
				{
					selectedUsers = selectedUsers + sep + colFieldValue;
				}
				else
				{
					selectedUsers = colFieldValue;
				}
			}
		}
	}
//	alert(selectedUsers);
	return selectedUsers;
}

//************************************************
// getSelectedColumnValues
//
// inputs: 	form - A form object
//		colName - Name of the hidden field  that you want to mine
//		sep - A separator string such as , or |
// what does it do:
// 	1. Expects tabular checkboxs to be named as: rownum
//	2. These checkboxes values need to be set to : 1,2,3
//	2. Expects a hidden field for every checkbox value: r1_coname, r2_colname
//	3. For every "rownum" named check box that is checked, 
//		it will collect the values for those hidden fields
//	4. For ex: if checkbox whose value is "2" is checked then "r2_colname' will be mined
//	5. Mined column values will be returned as val1|val2|val3
// Limitations
//	1. Doesn't work very well if a certain field is empty
//	2. Recommendation would be to use something like "None" or "Empty" to recognize these fields
// Remedies
// 	1. Potentially another version of this should be used that will take an array
//		and fill the empty ones with spaces.
//	2. getSelectedCheckBoxHiddenValues
//	3. getSelectedColumnValues
//******************************************************
function getSelectedColumnValues(form, colName, sep)
{
	var selectedUsers = "";
	elementArray = form.elements;
	for(i=0;i<elementArray.length;i++)
	{
		element = elementArray[i];
		if (element.type != "checkbox")
			continue;
		if (element.name != "rownum")
			continue;
		if (element.checked != true)
			continue;

//		alert("here");

		// Let's get the value of the column
		checkBoxValue = element.value;

		// There must be an input hidden field with this name
		// checkBoxName_colName
		colFieldName = "form.r" + checkBoxValue + "_" + colName;
//		alert("colFieldName:" + colFieldName);
		
		var colField = eval(colFieldName);
		colFieldValue = colField.value;
//		alert("colFieldValue" + colFieldValue);
	
		if (selectedUsers != "")
		{
			selectedUsers = selectedUsers + sep + colFieldValue;
		}
		else
		{
			selectedUsers = colFieldValue;
		}
	}
//	alert(selectedUsers);
	return selectedUsers;
}

//************************************************
// getSelectedColumnValuesAsArray
//
// inputs: 	form - A form object
//		colName - Name of the hidden field  that you want to mine
//		sep - A separator string such as , or |
// what does it do:
// 	1. Expects tabular checkboxs to be named as: rownum
//	2. These checkboxes values need to be set to : 1,2,3
//	2. Expects a hidden field for every checkbox value: r1_coname, r2_colname
//	3. For every "rownum" named check box that is checked, 
//		it will collect the values for those hidden fields
//	4. For ex: if checkbox whose value is "2" is checked then "r2_colname' will be mined
//	5. Mined column values will be returned as a zero index based array
//******************************************************
function getSelectedColumnValuesAsArray(form, colName)
{
	var colValueArray= new Array();
	elementArray = form.elements;
	index = 0;
	for(i=0;i<elementArray.length;i++)
	{
		element = elementArray[i];
		if (element.type != "checkbox")
			continue;
		if (element.name != "rownum")
			continue;
		if (element.checked != true)
			continue;

//		alert("here");

		// Let's get the value of the column
		checkBoxValue = element.value;

		// There must be an input hidden field with this name
		// checkBoxName_colName
		colFieldName = "form.r" + checkBoxValue + "_" + colName;
//		alert("colFieldName:" + colFieldName);
		
		var colField = eval(colFieldName);
		colFieldValue = colField.value;
//		alert("colFieldValue" + colFieldValue);
	
		colValueArray[index]=colFieldValue;
	}
	return colValueArray;
}

//************************************************
// getSelectedCheckBoxValues
//
// inputs: 	form - A form object
//		colName - Name of the hidden field  that you want to mine
//		sep - A separator string such as , or |
//************************************************
function getSelectedCheckBoxValues(form, colName, sep)
{
	var selectedUsers = "";
	elementArray = form.elements;
	for(i=0;i<elementArray.length;i++)
	{
		element = elementArray[i];
		if (element.name != colName)
		{
			continue;
		}
		if (element.type == "checkbox")
		{
			if (element.checked == true)
			{
				checkBoxValue = element.value;
				if (selectedUsers != "")
				{
					selectedUsers = selectedUsers + sep + checkBoxValue;
				}
				else
				{
					selectedUsers = checkBoxValue;
				}
			}
		}
	}
	return selectedUsers;
}

//************************************************
// getUnSelectedCheckBoxValues
//
// inputs: 	form - A form object
//		colName - Name of the hidden field  that you want to mine
//		sep - A separator string such as , or |
//************************************************
function getUnSelectedCheckBoxValues(form, colName, sep)
{
	var selectedUsers = "";
	elementArray = form.elements;
	for(i=0;i<elementArray.length;i++)
	{
		element = elementArray[i];
		if (element.name != colName)
		{
			continue;
		}
		if (element.type == "checkbox")
		{
			if (element.checked == false)
			{
//				alert("here");

				// Let's get the value of the column
//				checkBoxName = element.name;

				// There must be an input hidden field with this name
				// checkBoxName_colName
//				colFieldName = "form.r" + checkBoxName + "_" + colName;
//				alert("colFieldName:" + colFieldName);
				
//				var colField = eval(colFieldName);
//				colFieldValue = colField.value;
				checkBoxValue = element.value;
//				alert("colFieldValue" + checkBoxValue);

				if (selectedUsers != "")
				{
					selectedUsers = selectedUsers + sep + checkBoxValue;
				}
				else
				{
					selectedUsers = checkBoxValue;
				}
			}
		}
	}
//	alert(selectedUsers);
	return selectedUsers;
}

//************************************************
// getSelectedCheckBoxes in a form
//
// inputs: 	form object
//		A separator string such as , or |
//************************************************

function getSelectedCheckBoxes(form, sep)
{
	var selectedUsers = "";
	elementArray = form.elements;
	for(i=0;i<elementArray.length;i++)
	{
		element = elementArray[i];
		if (element.type == "checkbox")
		{
			if (element.checked == true)
			{
//				alert("here");
				if (selectedUsers != "")
				{
					selectedUsers = selectedUsers + sep + element.name;
				}
				else
				{
					selectedUsers = element.name;
				}
			}
		}
	}
//	alert(selectedUsers);
	return selectedUsers;
}

//************************************************
// quick and easy way to work with select objects
//
// inputs: 	select object
//		return selected option or value
//************************************************
function getOptionString(selectObject)
{
	selOption = selectObject.options[selectObject.selectedIndex];
	return selOption.text;
}
function getValueString(selectObject)
{
	selOption = selectObject.options[selectObject.selectedIndex];
	return selOption.value;
}

//************************************************
// Given a set of fields return their values if they are not empty
//
// inputs: 	form object
//		comma separated field names in that form
//************************************************
function getFieldValues(form,fieldNames)
{
   if (fieldNames == "")
   {
      return "";
   }
   fieldNameArray = fieldNames.split(",");
   fieldValues = "";
   for(i=0;i<fieldNameArray.length;i++)
   {
      fieldName = fieldNameArray[i];
      fieldObj = eval("form." + fieldName );
      fieldValue = fieldObj.value;
	fieldType = fieldObj.type;

	if (fieldType != "button" && fieldType != "hidden")
	{
		if (fieldValues == "")
		{
			fieldValues = fieldName + "=" + escape(fieldValue);
		}
		else
		{
			fieldValues += "&" + fieldName + "=" + escape(fieldValue);
		}
	}
   }
	return fieldValues;
}

function getAllFieldValues(form)
{
	// for each element
	fieldValues = "";
   for(i=0;i<form.elements.length;i++)
   {
	element = form.elements[i];
      fieldName = element.name;
      fieldValue = element.value;
	fieldType = element.type;

	if (fieldType != "button" && fieldType != "hidden")
	{
		if (fieldValues == "")
		{
			fieldValues = fieldName + "=" + escape(fieldValue);
		}
		else
		{
			fieldValues += "&" + fieldName + "=" + escape(fieldValue);
		}
	}
   }
   return fieldValues;
}

function setFieldValues(form, fieldValueString)
{
//	alert("Field values : " + fieldValueString);

	fieldValueArray = fieldValueString.split("&");
	for (i=0; i<fieldValueArray.length;i++)
	{
		fieldValuePair = fieldValueArray[i].split("=");
		fieldName = fieldValuePair[0];
		fieldValue = "";
		if (fieldValuePair.length > 1)
		{
			fieldValue = unescape(fieldValuePair[1]);
		}
		
//		alert("Setting " + fieldName + ":" + fieldValue);

	      fieldObj = eval("form." + fieldName );
		fieldObj.value = fieldValue;
	}
}


//************************************************
// required field validations for a form
//
// inputs: 	form object
//		comma separated field names in that form
//************************************************
function validateRequired(form,fieldNames)
{
   if (fieldNames == "")
   {
      return true;
   }
   fieldNameArray = fieldNames.split(",");
   for(i=0;i<fieldNameArray.length;i++)
   {
      fieldName = fieldNameArray[i];
      fieldObj = eval("form." + fieldName );
      fieldValue = fieldObj.value;
      if (fieldValue == "")
      {
         alert("'" + fieldName + "' is a required field" );
         fieldObj.focus();
         return false;
      }
   }
   return true;
}

//************************************************
// ReqExp support for field validations
//
//************************************************
//  Include the following line on your page
//  var typeArray = createTypeArray();
//

//************************************************
// An internal function used by regexp support
//************************************************
function createFieldType(fieldTypeName, regExp, fieldMessage )
{
	this.fieldTypeName = fieldTypeName;
	this.regExp = new RegExp(regExp);
	this.fieldMessage = fieldMessage;
	return this;
}

function createTypeArray()
{
	typeArray = new Array();
	typeArray.arzCode = new createFieldType("arzCode","^\\w{6}$","ARZ Code is alphanumeric and 6 characters wide");
	typeArray.scac = new createFieldType("scac","^\\w{0,4}$","ARZ Code is alphanumeric and 6 characters wide");
	return typeArray;
}

function validateField(fieldObj, inFieldType)
{
	fieldValue = fieldObj.value;
	if (fieldValue == "") return new Boolean(true);

	var fieldType  = typeArray[inFieldType];
	if (fieldType.regExp.test(fieldValue) == false)
	{
		line1 = "You have typed : '" + fieldValue + "' for " + inFieldType;
		line2 = fieldType.fieldMessage;
		alert(line1 + "\n" + line2);
		fieldObj.focus();
		return new Boolean(false);
	}
	return new Boolean(true);
}

//************************************************
// Validate field content based on pre-defined fieldtypes.
//
// inputs: 	form object
//		comma separated fieldNameAndType strings
// returns: true/false
// ex:  validateForContent(thisForm,"field1|field1Type,field2|field2Type")
//************************************************
function validateForContent(form,fieldNames)
{
   if (fieldNames == "")
   {
      return true;
   }
   fieldNameArray = fieldNames.split(",");
   for(i=0;i<fieldNameArray.length;i++)
   {
      fieldNameAndType = fieldNameArray[i];

	// Get field name and type
	fieldNameAndTypeArray = fieldNameAndType.split("|");
	fieldName = fieldNameAndTypeArray[0];
	fieldType = fieldNameAndTypeArray[1];

	// Get field object & value
      fieldObj = eval("form." + fieldName );
	
	if (validateField(fieldObj,fieldType) == false)
	{
		return false;
	}
   }
   return true;
}

function validateEmail(myEmail) 
{

  var exclude=/[^@\-\.\w]|^[@\.\-]|[\.\-]{2}|[@\.]{2}|(@)[^@]*\1/;
  var check=/@[\w\-]+\./;
  var checkend=/\.[a-zA-Z]{2,3}$/;

  if(((myEmail.value.search(exclude) != -1)||(myEmail.value.search(check)) == -1)||(myEmail.value.search(checkend) == -1))
  {
    return false;
  }
  else 
  {
     return true;;
  }
}


//************************************************
//edits numeric range
//************************************************
 function numericRange(myField, myRequired, myTypeInteger, myMin, myMax)
 {
   // input myfield the element to edit
   // boolean myRequired  true = required
   // boolean myTypeInteger true = must be integer
   // number  myMin  cannot be less than
   // number  myMax  cannot be > than
   //
   
   if (isEmpty(myField))
    { if (myRequired)
       {
         alert(myField.name + " must be entered");
         myField.focus();
         return false;
       }
       else
       {  
         return true;
       }
    }
       
    if (isNaN(myField.value))
    {   
       alert(myField.name + " must be numeric");
       myField.focus();
       return false;
    }

    workNum = parseFloat(myField.value);
    if (workNum < myMin)
    {   
        alert(myField.name + " cannot be less than " + myMin);
        myField.focus();
        return false;
    }
     
    if (workNum > myMax)
    {
        alert(myField.name + " cannot be greater than " + myMax);
        myField.focus();
        return false;
    }
    
    if (myTypeInteger)
    {   
        if (myField.value.indexOf(".",0) > -1)
        {
          alert(myField.name + " cannot contain a decimal point");
          myField.focus();
          return false;
        }  
    }
    if (myTypeInteger)
    {   
        if (myField.value.indexOf(" ",0) > -1)
        {
          alert(myField.name + " cannot contain embedded spaces");
          myField.focus();
          return false;
        }  
    }
    return true;
 }

//************************************************
//edits for productom.htlm
//************************************************

function isEmpty(myField) 
{
 if (myField.value == "") 
 {
    return true;
 }
 else
 {
    return false;
 }
}

//************************************************
//Get the current page as xml
//************************************************
function getDataAsXml(thisurl)
{
	url = thisurl + "&aspire_output_format=classic-xml";
	document.location=url;
}

function getDataAs(thisurl,dataFormat)
{
	url = thisurl + "&aspire_output_format=" + dataFormat;
	document.location=url;
}

//************************************************
// Used by the inner master page 
// to retrieve XML for any URL
// This needs to be improved for URLs 
// that don't have params.
// see: reports/masterpage/def-master-page.html
// see: reports/home/header-footer.properties
// It is not getting called from here. But from somewhere else!
//************************************************
function getDataAsUsingSelectOld(thisurl,selectObject)
{
    dataformat = getOptionString(selectObject);
	if (dataformat == "standard")
	{
		return;
	}
	url = thisurl + "&aspire_output_format=" + dataformat;
	alert(url);
	console.log(url);
	//document.location=url;
}

function getDataAsUsingSelect(thisurl,selectObject)
{
	//thisurl: is a javascript location object!
	//andnot a string
	
	//alert("hello");
    var dataformat = getOptionString(selectObject);
	if (dataformat == "standard")
	{
		return;
	}
	var paramCharIndex = thisurl.toString().indexOf("?");
	var newURL = "";
	if (paramCharIndex == -1)
	{
		//params are not there in this URL
		newURL = thisurl + "?aspire_output_format=" + dataformat;
	}
	else
	{
		//params are already there
		newURL = thisurl + "&aspire_output_format=" + dataformat;
	}
	
	//alert(newURL);
	document.location=newURL;
}
//************************************************
// Given a set of fields return their values if they are not empty
//
// inputs: 	form object
//		comma separated field names in that form
//************************************************
function getFieldValuesAsAWhereClause(form,fieldNames,columnNames, colTypes, nullColumnValue)
{
   if (fieldNames == "")
   {
      return "";
   }
   fieldNameArray = fieldNames.split(",");
   columnNameArray = columnNames.split(",");
   colTypesArray = colTypes.split(",");

   if (fieldNameArray.length != columnNameArray.length)
   {
	alert("Error: Number of fieldNames and columnNames do not match");
	return;
   }
   whereClause = "";
   for(i=0;i<fieldNameArray.length;i++)
   {
      fieldName = fieldNameArray[i];
	columnName = columnNameArray[i];
	colType = colTypesArray[i];

//	alert("Going through:" + fieldName + ":" + columnName + ":" + colType);

      fieldObj = eval("form." + fieldName );
      fieldValue = fieldObj.value;
	fieldType = fieldObj.type;


	if (fieldType != "button" && fieldType != "hidden")
	{
		curWhereClauseField = getWhereClauseForField(columnName,fieldValue,colType,nullColumnValue);
		if (curWhereClauseField == "")
			continue;
		if (whereClause == "")
		{
			whereClause = curWhereClauseField;
		}
		else
		{
			whereClause += " and " + curWhereClauseField;
		}
	}
   }
	return whereClause;
}

function getWhereClauseForField(columnName, colValue, colType,nullColumnValue)
{
//	alert("wcff");
	if (colValue == "")
	{
		return "";
	}
	if (colValue == nullColumnValue)
	{
		return "";
	}
	else
	{
//		alert("ColValue:" + colValue);
		if (colValue.indexOf('*') != -1)
		{
			// there is a wild card in it
			return columnName + " like '" + colValue + "'";
		}
		else if (colValue.indexOf('%') != -1)
		{
			return columnName + " like '" + colValue + "'";
		}
		if (colType == "string")
		{
			return columnName + " = '" + colValue + "'";
		}
		else
		{
			return columnName + " = " + colValue;
		}
	}
}

//************************************************
//edits for productom.htlm
//************************************************
function JAbsoluteURLTest()
{
	alert("test called");
	urlObject = new JURL("http://host:port/webappprefix/servlet/DisplayServlet?url=abc");

	alert(urlObject.protocol);
	alert(urlObject.hostWithPort);
	alert(urlObject.host);
	alert(urlObject.port);
	alert(urlObject.resource);
	alert(urlObject.webappPrefix);

}

function getUrlPrefix()
{
	var urlstring = "" + document.location;
	var urlObject = new JAbsoluteURL(urlstring);
	var urlPrefix = urlObject.protocol
				+ "://" + urlObject.hostWithPort
				+ "/" + urlObject.webappPrefix;
	return urlPrefix;				
}

function getHost()
{
	var urlstring = "" + document.location;
	var urlObject = new JAbsoluteURL(urlstring);
	return urlObject.host;
}
//************************************************
//edits for productom.htlm
//************************************************
function getRelativeURL(inUrl)
{
	firstFour = inUrl.substring(0,4);
	if (firstFour == "http")
	{
		absUrl = new JAbsoluteURL(inUrl);
		return absUrl.resource;
	}
	else
	{
		return inUrl;
	}
}

//************************************************
//edits for productom.htlm
//************************************************
function JAbsoluteURL(inUrl)
{
	this.protocol="";
	this.host="";
	this.port="";
	this.hostWithPort="";
	this.webappPrefix="";
	this.resource="";

   //
   //Get the protocol	
   //
   colonIndex = inUrl.indexOf(":");
   this.protocol = inUrl.substring(0,colonIndex);
   
   //
   //Get the host and port
   //
   colonIndex += 3;
   hostSepIndex = inUrl.indexOf("/",colonIndex);
   this.hostWithPort = inUrl.substring(colonIndex, hostSepIndex);
   
   //
   //Get the resource
   //
   this.resource=inUrl.substring(hostSepIndex);
   
   //
   //Get the webapp
   //
   webappEndIndex = inUrl.indexOf("/",hostSepIndex + 1);
   if (webappEndIndex == -1)
   {
   	// no more components
   	this.webappPrefix = this.resource;
   }
   else
   {
   	// more components
   	this.webappPrefix=inUrl.substring(hostSepIndex+1,webappEndIndex);
   }
   
   portSepIndex = this.hostWithPort.indexOf(":");

   if (portSepIndex == -1)
   {
   	//no port
   	this.port="";
   	this.host=this.hostWithPort;
   }
   else
   {
   	this.host=this.hostWithPort.substring(0,portSepIndex);
   	this.port=this.hostWithPort.substring(portSepIndex+1);
   }
 
}

function writeLoggedInStatus(userId)
{
	if ((userId != "annonymous") && (userId != ""))
	{
		document.write('Logged in:' + userId);
	}
	else
	{
		document.write('Not Logged in');
	}
}

String.prototype.trim = function() {

// skip leading and trailing whitespace
// and return everything in between
  var x=this;
  x=x.replace(/^\s*(.*)/, "$1");
  x=x.replace(/(.*?)\s*$/, "$1");
  return x;
}

function urldecode(ins)
{
   nins = ins.replace(/\+/g," ");
   return unescape(nins);
}

function dalert(msg)
{
}

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
		this.errorMessage = "Subject is empty";
		return;
	}
	if (linkUrl == "")
	{
		this.errorMessage = "A url is required for a link command";
		return;
	}
	
	var finalBody = '<p><a href="' + linkUrl + '">' + linkText + '</a></p>';
	dalert(finalBody);
	ci.newAppendText = finalBody;
	ci.newSubject = linkText;
}

function aspire_echoCommand(commandname, subject, body, ci
			, completesubjectline
			, completeBody)
{
	alert("commandname:" + commandname);
	alert("subject:" + subject);
	alert("trimmedbody:" + body);
	alert("completesubjectline:" + completesubjectline);
	alert("completebody:" + completeBody);
	ci.newSubject=subject;
	ci.newAppendText = "";
}

function aspire_questionCommand(commandname, subject, body, ci
			, completesubjectline
			, completeBody)
{
	var appendText = '<p class="question">' + subject + '</p>';
	ci.newSubject=subject;
	ci.newAppendText = appendText;
}

function aspire_attentionCommand(commandname, subject, body, ci
			, completesubjectline
			, completeBody)
{
	var appendText = '<p class="attention">' + subject + '</p>';
	ci.newSubject=subject;
	ci.newAppendText = appendText;
}

function aspire_codeCommand(commandname, subject, body, ci
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
	var newbody = newbody.replace(/>/g,"&gt;");
	var newbody = "<pre><code>\n" + newbody + "\n</code></pre>";
	ci.newSubject=subject;
	ci.newAppendText = newbody;
}

/*
function akc_onload_function()
{
	alert("hello world");
}
*/

function isVariableDefined(variablename)
{
	var t;
	var ex = "t = (typeof(" + variablename + ") == \"undefined\");";
	//alert(ex);
	eval(ex);
	//alert(t);
	return t;
}
function getAFunctionObject(functionName)
{
	var t = isVariableDefined(functionName);
	if (t == false)
	{
		//alert("function is defined");
		var funcobject;
		eval("funcobject = " + functionName + ";");
		return funcobject;
	}
	return null;
}

function executeConditionalOnLoad()
{
	var funcobject = getAFunctionObject("akc_onload_function");
	if (funcobject != null)
	{
		funcobject();
	}
}

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