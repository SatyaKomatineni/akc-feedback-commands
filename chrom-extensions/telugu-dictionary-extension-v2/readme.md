# About: Telugu Dictionary Extension V2
1. This is a chrome extension to explore telugu words in a dictionary without retyping them
2. Highlight a telugu word and right click to see its meaning either in the same tab or a new tab
3. Navigate like a lost soul from word to word

# How does this extension work
1. On any web page highlight a telugu word
2. Right click on the selected word once it is highlighted
3. You will see a menu items listed under "Explore Telugu words" (or something of that nature) 
4. You will see items like "Lookup T", "Lookup T in a new tab" etc. Depending on the release you may see a variation of these menu items.
4. If you choose the menu item, the current tab is redirected to the meaming page of that word in the telugu dictionary AndhraBharati.com/dictionary
5. you can also do the same in a new tab by picking an appropriate menu item
5. Once you are at the dictionary you can do this for any telugu word on the dictionary page
6. This is basically hyperlinking every word  in that dictionary so that you can explore the dictionarly endlessly without retyping the word
7. The create new tab feature allows you explore words while keeping the main context available. Like when you receive email, gmail can stay while the words can be displayed in other tabs.

# Security considerations
1. The selected word is sent to andhrabharati.com in a web request
2. Nothing else
3. I don't own the site AndhraBharati.com
4. So it is possible that the looked up words could be tracked and stored. 
5. But you are in control of what words you are choosing
6. It is equivalent to intentionally typing that word in the dictionary

# How to install this extension 
There are 3 ways

1. Using source files
2. Using the zip file
3. Using Chrome web store (this is a tbd)

# How to install using the zip file

## Step 1: Locate the zip file in github
1. Locate the zip file for this extension. 
2. Its name is telugu-dictionary-v2.zip
3. It is located at the same github location as this readme file

## Step 2: Download the zip file
4. [Here is the link to this zip file](./telugu-dictionary-extension-v2.zip). 
5. Clicking on this link will not directly download the file. Github will take you to the next screen. You will find a download button here. You probably have to scroll down to see this. 
6. This will download the file to the downloads directory of chrome.

## Step 3: Unzip the file to get a "code" directory
7. Place the zip file in a directory like "c:\xyz\telugu-dictionary-extension-v1.zip"
8. in windows right click on it and "extract all".
9. if you choose the default dir to unzip you will see "c:\xyz\telugu-dictionary-extension-v1\code"

## Step 4: Go to Manage Extensions
10. Go Manage extensions in chrome browser (you can type in the URL: chrome://extensions)
11. Turn on Developer mode (top right)

## Step 5: Install the extension
12. choose "Load Unpacked" and point it to the unzipped directory in step 2
13. This will load the extension and you can see it as one of the loaded extensions

## Step 6: Verifying the installation
14. Go to any webpage that has Telugu script on it
15. [I suggest you visit this telugu dictionary page](http://www.andhrabharati.com/dictionary/index.php?w=%E0%B0%B2%E0%B0%B2%E0%B0%BF%E0%B0%A4)
16. Double click on any telugu word to select it (or you can highlight)
17. Look for a menu called "Explore Telugu words". It has 2 sub menus
18. Lookup T: Use this menu to see meaning in the same tab
19. Lookup T New Tab: Use this menu to see meaning in a new tab

# How to debug if something went wrong with the extension
20. Very likely you have pointed chrome to a directoy that is not the parent of "manifest.json". In this case that directory should end in "code"
21. Try restarting the chrome browser by closing all chrome windows and opening again
22. Send me an email

# How to install it using source code
1. From github download the "code" directory or files individually and put them in a directory yoruself
2. Once you have the directory go to step 4 above as the process is same after

# How to install it using Chrome Web Store
1. This will soon be available
2. Today is 7/23/20

# How to uninstall the extension
1. Go to Manage extensions page in chrome browser
2. Use Remove to remove the extension
3. Delete the zip file and the directory manually 

# How to visit Manage Extensions page in Chrome browser
3. Go Manage extensions in chrome browser (you can type in the URL: chrome://extensions)
4. Turn on Developer mode (top right) if necessary for some additional options
