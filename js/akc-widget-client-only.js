//****************************************************************
//akc-widget-client-only.js
//This file is used to define the client side widgets
//Like the banners for example.
//
//At the moment this file is at the following 
// akc/filestorage/satya/documentfiles/4308/akc-widget-client-only.js
// Move this to the main js sub directory
// 
// See also akc-widget.js
//(?)See if there are name conflicts between the two files
// See also akc-widget-collection.js
//****************************************************************

var AKC;
if (!AKC) {
    AKC = {};
}
(function () {

    //Interface
    //A class to facilitate akc widgets
    //Note this is not a function but a class
    AKC.AkcWidgetClientOnly = AkcWidgetClientOnly;
    
    //Implementations
    function AkcWidgetClientOnly(inTemplateUrl, divElement, inDivData)
    {
        this.templateUrl = inTemplateUrl;
        this.divData  = inDivData;
        this.template = "";
        this.targetDivElement = divElement;
        var that = this;
        
        //dalert("step1: client only akc widget done");
        //dalert(inDivId);
        //dalert(this.targetDivId);
        
        function populateTargetDiv(innerHtmlString)
        {
            //dalert("hello");
            //dalert(that.targetDivId);
            $(that.targetDivElement).html(innerHtmlString);
        }
       
        populateTargetDiv("Begining my run");
        
        //Invoked from the callback function
        this.getHtml = function()
        {
            dalert( "step5: mixing and rendering");
            dalert(JSON.stringify(that.divData));
            dalert(that.template);
            $.templates( {"template1" : that.template} );
            var finalhtml = $.render.template1(that.divData);
            dalert("final:" + finalhtml);
            populateTargetDiv(finalhtml);
            $(that.targetDivElement).show();
        }
        
        this.getTemplate = function()
        {
            dalert("step3: getTemplate called");
            //dalert(this.templateUrl);
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
            dalert("step2: populate function");
           //Go and get the tempate
           //At the end of the template
            //run transform and pop
           this.getTemplate();
        }
        
        function ajaxFailure()
        {
            dalert('ajax failed');
        }    
        
        function replyFromGetTemplate(data)
        {
            dalert("step4: replyFromGetTemplate called");
            that.template=data;
            that.getHtml();
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
function akcWidgetSetup1()
{
    //Get every element with the specified class
    var elementArray = $(".akc_expand1");
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
            dalert("function doesn't exist:" + typeFuncObject);
            continue;
        }
        typeFuncObject(element);
    }
}//eof-local-function
    
/*
******************************************************
* Prime the pump
******************************************************
*/
    //Prime the pump
    $(document).ready(akcWidgetSetup1);

})(); //eof-file


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
function akcExpand_testClientWidget_function(divObject)
{
    dalert("I am in clientwidget");
    //Get the inner html of your div
    var expandDivData = $(divObject).html();
    //dataxml = "<root>" + expandDivData + "</root>";
    dataxml = expandDivData;
    dalert(dataxml);
    dataxmlobj = $.parseXML(dataxml);
    var dataObj = AKC.getJSONAtNode2(dataxmlobj,"script");
    dalert(JSON.stringify(dataObj));

    //No data url
    //This is in control files. called meny widget template
    //In test database it is 4058
    //var templateUrl =  "/akc/display?url=DisplayNoteBodyURL&reportId=4379";
    //var templateUrl =  "http://satyakomatineni.com/akc/display?url=DisplayNoteBodyURL&reportId=4575";
    var templateUrl =  "/akc/display?url=DisplayNoteBodyURL&reportId=4575";
    //var templateUrl =  "file:///C:/satya/data/codebase/webapps/test/jsrendertest/sampleTemplate5.txt";
    
    var menuWidget = new AKC.AkcWidgetClientOnly(templateUrl,divObject,dataObj);
    //populate the menu widget
    menuWidget.populate();
    //$(divObject).removeClass("akc_expand");
}

function dalert(message)
{
    //alert(message);
}