//****************************************************************
//Introduce a global variable called AKC
//AKC holds the common functions and objects for javascript
//AKC does the scoping for javascript functions
//
//Also see akc-widget-client-only.js
//This later file is used to define the client side widgets
//Like the banners for example.
//****************************************************************

var AKC;
if (!AKC) {
    AKC = {};
}

//****************************************************************
//Attach a series of functions and objects to AKC
//This allows you call or instantiate with things like 
//  new AKC.someObject
//  or call AKC.someFunction
//
// Do this in every javascript file for AKC in the future
// This avoids name conflicts.
//****************************************************************
(function () {

    //Interface
    //A class to facilitate akc widgets
    //Note this is not a function but a class
    AKC.AkcWidget = AkcWidget;
    
    //A utility function
    AKC.getFunctionObject = getFunctionObject;
    
    //deprecated: can be called internally
    AKC.akcWidgetSetup=akcWidgetSetup;
    
    //Takes no arguments
    //Returns an object containing URL details
    AKC.getAKCURLDetailsObject = getAKCURLDetailsObject;
    
    //Implementations
    function AkcWidget(inDataUrl, inTemplateUrl, divElement, inDivData)
    {
        this.dataUrl = inDataUrl;
        this.templateUrl = inTemplateUrl;
        this.divData  = inDivData;
        this.data = {};
        this.template = "";
        this.targetDivElement = divElement;
        var that = this;
        
        //alert(inDivId);
        //alert(this.targetDivId);
        
        function populateTargetDiv(innerHtmlString)
        {
            //alert("hello");
            //alert(that.targetDivId);
            $(that.targetDivElement).html(innerHtmlString);
        }
       
        populateTargetDiv("Begining my run");
        
        //Invoked from the callback function
        this.getHtml = function()
        {
            //alert( "hello I am done");
            //alert(JSON.stringify(that.data));
            //alert(that.template);
            $.templates( {"template1" : that.template} );
            var finalhtml = $.render.template1(that.data);
            //alert("final:" + finalhtml);
            populateTargetDiv(finalhtml);
            $(that.targetDivElement).show();
        }
        
        this.getTemplate = function()
        {
            //alert("getTemplate called");
            //alert(this.templateUrl);
            $.ajax({
              url: this.templateUrl,
              cache: false,
              dataType:"text",
              context: this,
              failure: ajaxFailure,
              success: replyFromGetTemplate
            });        
        }
        this.populate = function()
        {
            $.ajax({
              url: this.dataUrl,
              cache: false,
              dataType:"text",
              context: this,
              failure: ajaxFailure,
              success: replyFromGetData
            });      
        }
        function ajaxFailure()
        {
            alert('ajax failed');
        }    
        function replyFromGetData(data)
        {
            //alert("reply from get data");
            //alert(data);
            var dataxml = $.parseXML(data);
            var s = AKC.aspireXmlToJson(dataxml);
            s["inputDivData"] = this.divData;
            //alert(JSON.stringify(s));
            this.data=s;
            this.getTemplate();    
        }
        
        function replyFromGetTemplate(data)
        {
            //alert("replyFromGetTemplate called");
            this.template=data;
            this.getHtml();
        }
        
    }//end-of-AkcWidget
    
//returns a function object given its name
//if the function is undefined return null
function getFunctionObject(functionname)
{
    var funcobject;
    eval("funcobject = " + functionname + ";");
    if (typeof(funcobject) == "function")
    {
        return funcobject;
    }
    else
    {
        //null is a javascript object
        return null;
    }
}
function akcWidgetSetup()
{
    //Get every element with the specified class
    var elementArray = $(".akc_expand");
    for(i=0; i<elementArray.length; i++)
    {
        //one of the divs
        var element = elementArray[i];
        //See if the element has href
        var type = $(element).attr("type");
        type = "akcExpand_" + type + "_function"; 
        var typeFuncObject = getFunctionObject(type);
        if (typeFuncObject == null)
        {
            alert("function doesn't exist:" + typeFuncObject);
            continue;
        }
        typeFuncObject(element);
    }
}//eof-local-function

//public function getAKCURLDetailsObject()
/*
<div id="AKCURLDetailsDivID" style="display:none">
    <urlname>{{url}}</urlname>
    <ownerUserId>{{ownerUserId}}</ownerUserId>
    <downerUserId>{{downerUserId}}</downerUserId>
    <loggedInStatus>{{profile_aspire_loggedin_status}}</loggedInStatus>
    <loggedInUserId>{{profile_user}}</loggedInUserId>
</div>
*/
function getAKCURLDetailsObject()
{
    var urlDiv = $("#AKCURLDetailsDivID")[0];
    var urlDivHtml = $(urlDiv).html();
    var urlDivXmlString = "<root>" + urlDivHtml + "</root>";
    var urlDivXmlObj = $.parseXML(urlDivXmlString);
    var urlDetailsJSONObject = AKC.getJSONAtNode(urlDivXmlObj, "root");
    //alert(JSON.stringify(urlDetailsJSONObject));
    return urlDetailsJSONObject;
}

/*
******************************************************
* Prime the pump
******************************************************
*/
    //Prime the pump
    $(document).ready(akcWidgetSetup);

})(); //eof-file


/*
******************************************************
* This has to stay outside the closure for now
* Future architecture may move this in
******************************************************
*/
function akcExpand_folderWidget_function(divObject)
{
    var urlDetailsObj = AKC.getAKCURLDetailsObject();
    if (urlDetailsObj.urlname == null)
    {
        alert("url not defined. weird error. this shouldn't happen");
        return;
    } 
    if (urlDetailsObj.urlname.toLowerCase() != "displaynoteimpurl")
    {
        //This is not the url I want to show this on
        return;
    }

    //Get the inner html of your div
    var expandDivData = $(divObject).html();
    dataxml = "<root>" + expandDivData + "</root>";
    dataxmlobj = $.parseXML(dataxml);
    var dataObj = AKC.getJSONAtNode(dataxmlobj,"root");
    var dataUrl = "/akc/display?url=NotesIMPTitlesURL"
    dataUrl += "&folderId=" + dataObj.folder_id + "&order_by_format=news&aspire_output_format=embedded-xml";
    var templateUrl =  "/akc/display?url=DisplayNoteBodyURL&reportId=4309";
    
    var folderWidget = new AKC.AkcWidget(dataUrl,templateUrl,divObject,dataObj);
    //populate the folder widget
    folderWidget.populate();    
    $(divObject).addClass("akc_orangeBorder");
}

/*
******************************************************
* Expected div structure
*
<div class="akc_expand" type="taggedMenuWidget">
        <tagnames>menu1,menu2</tagnames>
        <menuHeader>menuname</menuHeader>
</div>
*
* <div
******************************************************
*/
function akcExpand_taggedMenuWidget_function(divObject)
{
    //alert("I am in taggedmenuwidget");
    //Get the inner html of your div
    var expandDivData = $(divObject).html();
    dataxml = "<root>" + expandDivData + "</root>";
    dataxmlobj = $.parseXML(dataxml);
    var dataObj = AKC.getJSONAtNode(dataxmlobj,"root");
    //alert(JSON.stringify(dataObj));

    var dataUrl = "/akc/display?url=getFoldersForTagsURL&tagnames=" + dataObj.tagnames + "&aspire_output_format=embedded-xml";
    //This is in control files. called meny widget template
    //In test database it is 4058
    var templateUrl =  "/akc/display?url=DisplayNoteBodyURL&reportId=4379";
    
    var menuWidget = new AKC.AkcWidget(dataUrl,templateUrl,divObject,dataObj);
    //populate the menu widget
    menuWidget.populate();
    //$(divObject).removeClass("akc_expand");
}

