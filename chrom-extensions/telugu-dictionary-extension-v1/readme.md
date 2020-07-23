# About
1. This is a chrome extension to explore telugu words in a dictionary without retyping them
2. Highlight a telugu word and right click to see its meaning
3. Navigate like a lost soul from word to word


# How does this extension work
1. On any web page highlight a telugu word
2. Right click on the selected word once it is highlighted
3. You will see a menu item called "Lookup T"
4. If you choose the menu item, the current tab is redirected to the meaming page of that word in the telugu dictionary AndhraBharati.com/dictionary
5. Once you are at the dictionary you can do this for any telugu word on the dictionary page
6. This is basically hyperlinking every word  in that dictionary so that you can explore the dictionarly endlessly without retyping the word

# Security considerations
1. The selected word is sent to andhrabharati.com in a web request
2. Nothing else
3. I don't own the site AndhraBharati.com
4. So it is possible that the looked up words could be tracked and stored. 
5. But you are in control of what words you are choosing
6. It is equivalent to intentionally typing that word in the dictionary

# How to install using the zip file
1. Locate the zip file for this extension. 
2. Its name is telugu-dictionary-v1.zip
3. It is located at the same github location as this readme file
4. [Here is the link to this zip file](./telugu-dictionary-extension-v1.zip). Clicking on this link will not directly download the file. Github will take you to the next screen. You will find a download button here. This will download the file to the downloads directory of chrome.
5. Follow the  insturctions below to install the downloaded code as a chrome extension

# How to install any chrome extension from source code
## Step 1: Download the Zip file
1. Download the zip file
2. Place the zip file in a directory like "c:\xyz\telugu-dictionary-extension-v1.zip"

## Step 2: Unzip/Extract the zip to a directory
3. in windows right click on it and "extract all".
4. if you choose the default dir to unzip you will see "c:\xyz\telugu-dictionary-extension-v1\code"

## Step 3: Go to Manage Extensions
3. Go Manage extensions in chrome browser (you can type in the URL: chrome://extensions)
4. Turn on Developer mode (top right)

## Step 4: Install the extension
5. choose "Load Unpacked" and point it to the unzipped directory in step 2
6. This will load the extension and you can see it as one of the loaded extensions

## Step 5: Verifying the installation
1. Go to any webpage that has Telugu script on it
2. [I suggest you visit this telugu dictionary page](http://www.andhrabharati.com/dictionary/index.php?w=%E0%B0%B2%E0%B0%B2%E0%B0%BF%E0%B0%A4)
3. Double click on any telugu word
4. Look for a menu called "Lookup T"
5. You will be taken to the meaning of that word

# How to debug if something went wrong with the extension
1. Try restarting the chrome browser by closing all chrome windows and opening again
2. Send me an email

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
