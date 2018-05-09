var AKC;
if (!AKC) {
    AKC = {};
}
(function () {

    //**********************************************
    //Interface
    //**********************************************
    //aspireXmlToJson1(mainXmlObjectNode)
    AKC.aspireXmlToJson = aspireXmlToJson1;

    //deprecated
    AKC.objectXmlToJson = realXmlToJson1Wrapper;
    
    //JSONAtNode(mainXmlObjectNode, nodeName)
    AKC.getJSONAtNode = getJSONAtNode;


    //**********************************************
    //Implementations
    //**********************************************
    function getJSONAtNode(mainXmlObjectNode, nodeName, convertToLowercase)
    {
        var objectNode 
        = $(mainXmlObjectNode).find(nodeName)[0];
        if (objectNode == null)
        {
            alert("sorry null root node");
            return {};
        }
        return realXmlToJson1Wrapper(objectNode, convertToLowercase);
    }
        
    // Changes XML to JSON
    function aspireXmlToJson1(mainXmlObjectNode)
    {
        return getJSONAtNode(mainXmlObjectNode, "AspireDataSet",false);
    } 
    
function realXmlToJson1Wrapper(inObjectNode, inConvertToLowercase)
{     
    var convertToLowercase = (inConvertToLowercase == null) ? true : convertToLowercase;
    return realXmlToJson1(inObjectNode);
    
    function realXmlToJson1(objectNode)
    {
        // Create the return object
        var obj = {};
    
        //alert("Processing:" + objectNode.nodeName);
        
        for(var i = 0; i < objectNode.childNodes.length; i++) 
        {
            //item is the node
            //childnodes is the nodelist
            var item = objectNode.childNodes.item(i);
            var nodeName = item.nodeName;
            if (convertToLowercase == true)
            {
                nodeName = nodeName.toLowerCase();
            }
            
            //alert("processing:" + nodeName + ":" + item.nodeValue);
            var nodetype = getNodeType(item);
            
            if (nodetype == "ignore")
            {
                continue;
            }
            else if (nodetype == "attribute")
            {
                obj[nodeName] = item.nodeValue;
            }
            else if (nodetype == "emptynode")
            {
                //it is a text node
                //alert("adding an empty node:" + nodeName);
                obj[nodeName] = "";
            }
            else if (nodetype == "text")
            {
                var textValue = getTextNodeValue(item);
                //alert(nodeName + ":" + textValue);
                obj[nodeName] = textValue;
            }
            else
            {
                //alert("it is a collection:" + nodeName);
                var objArray = new Array();
                obj[nodeName] = objArray;
                processCollectionNode(item, objArray);
            }
        }
        return obj;
    };
    
    function processCollectionNode(colNode, objArray)
    {
        //I am: <some-loop>
        //get my child
        //<row>
        //get an object for that row
        for(var i = 0; i < colNode.childNodes.length; i++) 
        {
            var rowNode = colNode.childNodes.item(i);
            var rowObject = realXmlToJson1(rowNode);
            objArray.push(rowObject);
        }
    }
    
    function getNodeType(xmlnode)
    {
        //it is not an element
        if (xmlnode.nodeType != 1)
        {
            return "ignore";
        }
        //it is an attribute
        if (xmlnode.nodeType == 2)
        {
            return "attribute";
        }
        
        //<some-node/>....
        if (xmlnode.hasChildNodes() == false)
        {
            //no children
            //<some-node/>
            return "emptynode";
        }
        
        //the node has children
        //See if it has the following pattern
        //<some-node>hello value</some-node>
        
        var i = xmlnode.childNodes.length;
        //first child
        var childnode = xmlnode.childNodes.item(0);
        //alert(childnode.nodeType);
        //3 - text
        //4 - text encoded in cdata
        if ((childnode.nodeType == 3) || (childnode.nodeType == 4))//text
        {
            //Only one child to this element
            if (i==1) {
                return "text";
            }
        }
        //More than one child: (text, element)
        //Detect a pattern like this
        //<some-node><row><some-e>dddd</some-e></row></some-node>
        return "collection";
    }
    
    //Return the text value from a structure like
    //<some-node>hello value</some-node>
    function getTextNodeValue(xmlnode)
    {
        return xmlnode.childNodes.item(0).nodeValue;
    }
}//end-of-realXmlToJson1Wrapper    
})();

