//****************************************************************
// 4/17/2014
// Not sure why I have this file separately!
// Probably for testing
// See the akc-widget.js instead.
//****************************************************************
var AKC;
if (!AKC) {
    AKC = {};
}
(function () {

    //Interface
    //A class to facilitate akc widgets
    //Note this is not a function but a class
    AKC.AkcWidget1 = AkcWidget1;
    
    //Implementations
    function AkcWidget1(inDataUrl, inTemplateUrl, divElement, inDivData)
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
            alert(JSON.stringify(s));
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
function akcExpand_taggedMenuWidget_function(divObject)
{
    //alert("I am in taggedmenuwidget");
    //Get the inner html of your div
    var expandDivData = $(divObject).html();
    dataxml = "<root>" + expandDivData + "</root>";
    dataxmlobj = $.parseXML(dataxml);
    var dataObj = AKC.getJSONAtNode(dataxmlobj,"root");
    //alert(JSON.stringify(dataObj));

    var dataUrl = "/akc/display?url=getFoldersForTagsURL&tagnames=android&aspire_output_format=embedded-xml";
    var templateUrl =  "/akc/display?url=DisplayNoteBodyURL&reportId=4058";
    
    var menuWidget = new AKC.AkcWidget1(dataUrl,templateUrl,divObject,dataObj);
    //populate the menu widget
    menuWidget.populate();
}

