//****************************************************************
// akc-widget-2-test.js
// 4/17/2014
// A test file
//
// Modeled after akc-widget1.js
// See also akc-widget.js instead.
//
// This will be kept in a URL
// Use this URL to include it to test your stuff
// 
// Use script, src=the following url, close script
// URL: /akc/display?url=DisplayNoteBodyURL&reportId=4796&ownerUserId=satya
//****************************************************************
var AKC;
if (!AKC) {
    AKC = {};
}
(function () {

    //Interface
    //A class to facilitate akc widgets
    //Note this is not a function but a class
    AKC.AkcTestWidget1 = AkcTestWidget1;
    
    //Implementations
    function AkcTestWidget1(divElement, inDivData, inAsIsDivXML)
    {
        //this.that = this;
        
        //alert(inDivId);
        //alert(this.targetDivId);
        
        //private function
        function populateTargetDiv(innerHtmlString)
        {
            console.log("populating target div");
            $(divElement).html(innerHtmlString);
        }
       
        populateTargetDiv("Begining my run");
        
        this.populate = function()
        {
            alert("hi, I am here");
            var escapedHTML = escapeHTML(inAsIsDivXML);
            populateTargetDiv("<pre>" + escapedHTML + "</pre>");
            $(divElement).show();
            alert("finish");
        }
    }//end-of-AkcWidget
    
    AKC.escapeHTML=escapeHTML;
    function escapeHTML(text)
    {
       var chr = { '"': '&quot;', '&': '&amp;', '<': '&lt;', '>': '&gt;' };
       function abc(a)
       {
          return chr[a];
       }
       return text.replace(/[\"&<>]/g, abc);
    }
})(); //eof-file

/*
******************************************************
* Expected div structure
*
<div class="akc_expand" type="test1Widget">
        <tagnames>menu1,menu2</tagnames>
        <menuHeader>menuname</menuHeader>
</div>
*
* <div
******************************************************
*/
function akcExpand_test1Widget_function(divObject)
{
    alert("I am in taggedmenuwidget");
    //Get the inner html of your div
    var expandDivData = $(divObject).html();
    dataxml = "<root>" + expandDivData + "</root>";
    dataxmlobj = $.parseXML(dataxml);
    var dataObj = AKC.getJSONAtNode(dataxmlobj,"root");
    alert(JSON.stringify(dataObj));

    var menuWidget = new AKC.AkcTestWidget1(divObject,dataObj,dataxml);
    //populate the menu widget
    menuWidget.populate();
}

