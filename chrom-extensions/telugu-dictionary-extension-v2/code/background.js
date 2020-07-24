
/**
 * background.js
 * 
 * How to use this extension to explore Telugu Dictionaries
 * 
 * Go to AndhraBharati.com/dictionary
 * 
 * 1. Double click on any telugu word
 * 2. Right click and choose "Lookup T" (for Lookup Telugu)
 * 
 * Local directory:
 * 
 * C:\satya\data\code\akc-feedback-commands\chrom-extensions\telugu-dictionary-extension-v2\code
 * 
 */


 //Same tab menu
 var menu_id_title="Lookup T"
 var menu_id="telugu_lookup_id"

//New tab menu
var menu_id_new_tab="telugu_lookup_newtab_id"
var menu_id_new_tab_title="Lookup T: new tab"


function clicked(info, tab)
{
    console.log("Your menu is clicked")
    s = info.selectionText
    console.log("ST:" + s)
    console.log(info)
    console.log(tab)
    myNewUrl = "http://www.andhrabharati.com/dictionary/index.php?w="
    myNewUrl += encodeURIComponent(s)

    //Same tab or new tab
    menuid = info.menuItemId
    console.log("Selected menu is:" + menuid)
    if (menuid === menu_id)
    {
        console.log("Opening in the same tabl")
        chrome.tabs.update(tab.id, {url: myNewUrl});
        return
    }
    console.log("opening in a new tab")
    chrome.tabs.create({url: myNewUrl})
    return
}

function createMyMenu()
{
    var context = "selection"
    //Register 
    menuid1 = chrome.contextMenus.create(
                    {
                        "title": menu_id_title, 
                        "contexts":[context],
                        "id":menu_id
                    }
               );
    console.log("Menuid1 added:" + menuid1)
    menuid2 = chrome.contextMenus.create(
                    {
                        "title": menu_id_new_tab_title, 
                        "contexts":[context],
                        "id":menu_id_new_tab
                    }
                );

    console.log("Menuid2 added:" + menuid2)
}

chrome.runtime.onInstalled.addListener(function() {
    console.log("Installing menu")
    createMyMenu()
    console.log("Installing menu done")
 }
);

//Register callback
chrome.contextMenus.onClicked.addListener(clicked)
