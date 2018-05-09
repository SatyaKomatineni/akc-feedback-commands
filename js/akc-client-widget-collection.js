/*
******************************************************
* akc-client-widget-collection.js
*
* 4/22/14
* Move this file to the js directory
* it is currently at
* /item/4603
* 
* 7/15/2013
* In the test project these are known as
* use akc-widget-collection-1.js for serverside
* releies on akc-widget-collection.js for research
* 
* /item/4603 
* ****************************************************
* 
* Widgets added so far
* ****************************************************
* TextAdBox1Widget (tab1t-)
* SocialAdBox1Widget (sab1t-)
* Banner1Widget (sb1t-)
* Banner2Widget (sb2t-)
*
* Expected div structure
* ****************************************************
<div class="akc_expand1 akc_expand_hide" type="testClientWidget">
<script type="text">
    <abc>xyz</abc>
    <loop>
      <row>
         <f1/>
         <f2/>
      </row>
    </loop>
</script>
</div>    
*
******************************************************
*/
/*
******************************************************
* TextAdBox1Widget
* Uses client side data
******************************************************
*/
//Client side test
function akcExpand_TextAdBox1WidgetL_function(divObject)
{
    var templateUrl =  "text-ad-box1-template.html";
    akcExpand_ClientSideData_Generic("TextAdBox1WidgetL",divObject,templateUrl);
}

//Server side
function akcExpand_TextAdBox1Widget_function(divObject)
{
    var templateUrl =  "/akc/display?url=DisplayNoteBodyURL&reportId=4600";
    akcExpand_ClientSideData_Generic("TextAdBox1Widget",divObject,templateUrl);
}

//Server side
function akcExpand_SocialAdBox1Widget_function(divObject)
{
    var templateUrl =  "/akc/display?url=DisplayNoteBodyURL&reportId=4605";
    akcExpand_ClientSideData_Generic("SocialAdBox1Widget",divObject,templateUrl);
}

//Server side
function akcExpand_Banner1Widget_function(divObject)
{
    var templateUrl =  "/akc/display?url=DisplayNoteBodyURL&reportId=4606";
    akcExpand_ClientSideData_Generic("Banner1Widget",divObject,templateUrl);
}
function akcExpand_Banner2Widget_function(divObject)
{
    var templateUrl =  "/akc/display?url=DisplayNoteBodyURL&reportId=4611";
    akcExpand_ClientSideData_Generic("Banner2Widget",divObject,templateUrl);
}
/*
******************************************************
* Specific expand functions will call the following
* by passing the template url
* make this part of a fixed js page and remove it from here
******************************************************
*/
function akcExpand_ClientSideData_Generic(widgetName, divObject, templateUrl)
{
    dalert("I am in clientwidget for: " + widgetName);
    //Get the inner html of your div
    var expandDivData = $(divObject).html();
    //dataxml = "<root>" + expandDivData + "</root>";
    dataxml = expandDivData;
    dalert(dataxml);
    dataxmlobj = $.parseXML(dataxml);
    var dataObj = AKC.getJSONAtNode2(dataxmlobj,"script");
    dalert(JSON.stringify(dataObj));

    var menuWidget = new AKC.AkcWidgetClientOnly(templateUrl,divObject,dataObj);
    //populate the menu widget
    menuWidget.populate();
}
function dalert(message)
{
    //alert(message);
}
