
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
 */

var menu_id="telugu_lookup_id"

function clicked(info, tab)
{
    console.log("Your menu is clicked")
    s = info.selectionText
    console.log("ST:" + s)
    console.log(info)
    console.log(tab)
    myNewUrl = "http://www.andhrabharati.com/dictionary/index.php?w="
    myNewUrl += encodeURIComponent(s)
    chrome.tabs.update(tab.id, {url: myNewUrl});
}

function createMyMenu()
{
    var title="Lookup T"
    var context = "selection"

    menuid = chrome.contextMenus.create(
                    {
                        "title": title, 
                        "contexts":[context],
                        "id":menu_id
                    }
               );
    //Register callback
    chrome.contextMenus.onClicked.addListener(clicked)
}

chrome.runtime.onInstalled.addListener(function() {
    console.log("Installing menu")
    createMyMenu()
    console.log("Installing menu done")
 }
);

//Register callback
chrome.contextMenus.onClicked.addListener(clicked)
