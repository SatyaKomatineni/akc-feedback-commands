/*
******************************************************
* akc-gen-java-widget.js
* based on: akc-client-widget-collection.js
*
* Where is this located
* ***************************
* This item is in the control folder
* This item id: 4805
* 
* 4/22/14
* **************
* /item/4804, 4807, 4814 
* ****************************************************
*
* Codegen Widgets so far
* ****************************************************
* GenerateJavaClientWidget (gjwt-) (4804) (4/22/2014)
* GenerateSQLServerClientWidget (gsswt-) (4807) (4/22/2014)
* GenerateAspireDisplayURL1ClientWidget (4814) (4/22/2014)
* GenerateSQLServerStoredProcClientWidget(4836) (6/4/2014)
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
<div class="akc_expand1 akc_expand_hide" type="GenerateJavaClientWidget">
<script type="text">
    <classname>xyz</classname>
    <attributes>
      <row>
         <name>field1</name>
         <type>string</type>
      </row>
      <row>
         <name>field2</name>
         <type>int</type>
      </row>
    </attributes>
</script>
</div>    
*
******************************************************
*/
function akcExpand_GenerateJavaClientWidget_function(divObject)
{
    var templateUrl =  "/akc/display?url=DisplayNoteBodyURL&reportId=4804";
    akcExpand_ClientSideData_Generic("GenerateJavaClientWidget",divObject,templateUrl);
}
function akcExpand_GenerateSQLServerClientWidget_function(divObject)
{
    var templateUrl =  "/akc/display?url=DisplayNoteBodyURL&reportId=4807";
    akcExpand_ClientSideData_Generic("GenerateSQLServerClientWidget",divObject,templateUrl);
}
function akcExpand_GenerateAspireDisplayURL1ClientWidget_function(divObject)
{
    var templateUrl =  "/akc/display?url=DisplayNoteBodyURL&reportId=4814";
    akcExpand_ClientSideData_Generic("GenerateAspireDisplayURL1ClientWidget",divObject,templateUrl);
}
function akcExpand_GenerateAspireUpdate1ClientWidget_function(divObject)
{
    var templateUrl =  "/akc/display?url=DisplayNoteBodyURL&reportId=4824";
    akcExpand_ClientSideData_Generic("GenerateAspireUpdate1ClientWidget",divObject,templateUrl);
}

function akcExpand_GenerateSQLServerStoredProcClientWidget_function(divObject)
{
    var templateUrl =  "/akc/display?url=DisplayNoteBodyURL&reportId=4836";
    akcExpand_ClientSideData_Generic("GenerateSQLServerStoredProcClientWidget",divObject,templateUrl);
}
