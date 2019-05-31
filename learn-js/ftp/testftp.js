
const ftp = require("basic-ftp");
const readenv = require("./readenv");
const u = require("./ftputils");

var readline = require('readline');

async function getNamesfromFtpLocation(ftpSiteName, path) {
    const client = new ftp.Client()
    client.ftp.verbose = false
    let dirListing = null;
    try {
        const ftpHostSpec = new readenv.createHostSpecFromEnv(ftpSiteName);

        //wait to login
        console.log("waiting to connect to:" + ftpHostSpec.name);
        await client.access({
            host: ftpHostSpec.ip,
            user: ftpHostSpec.user,
            password: ftpHostSpec.password
            //,secure: true
        })

        //finished logging in, after await
        console.log("Successful login");

        //wait to get a list of what the site has to offer
        console.log("wait for a list of files");
        if (u.isValid(path))
        {
            console.log(`Going after files in path: ${path}`)
            dirListing = await client.list(path);
        }
        else
        {
            console.log(`Going after files in the root`)
            dirListing = await client.list(path);
        }
        //clsworkWithListings(dirListing);
    }
    catch(err) {
        console.log("in the catch block of both awaits")
        console.log(err)
    }
    console.log("closing the ftp connection")
    client.close()

    //dirListing may be null if the await block fails above
    return dirListing;
}

//lets call the function

/**
 * @param {FileInfo[]} ftpListingArray 
 * 
 * Each FileInfo looks like this
 * 
 * FileInfo {
    name: '14122018',
    type: 2,
    size: 0,
    permissions: { user: 7, group: 5, world: 5 },
    hardLinkCount: 1,
    link: '',
    group: 'ftp',
    user: 'ftp',
    date: 'Dec 14 2018' }
 *
 *
 */
function workWithListings(ftpListingArray)
{
    if (u.isInvalidObject(ftpListingArray))
    {
        console.log(`The listing variable is not valid: ${ftpListingArray}`);
        return;
    }
    console.log("Number of directories/files :" + ftpListingArray.length);
    //@param {FileInfo} elem
    filenameArray = ftpListingArray.map((elem) => {
        return elem.name
    })
    console.log(filenameArray);
}

async function printFtpListingsFor(ftpSiteName,path)
{
    // {Promise<any>} dirListingPromise
    // {FileInfo[]} ftpListingArray 
    let ftpListingArray = await getNamesfromFtpLocation(ftpSiteName, path);
    workWithListings(ftpListingArray);
}

//printFtpListingsFor("someUnknownFtp");
//printFtpListingsFor("wu1");
//printFtpListingsFor("wu1", "/*052019");

var rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    terminal: false
  });
  

console.log("rl > Type in a path:");
rl.on('line', function (line) {
if (isQuit(line) == true)
{
    console.log("Quitting")
    rl.close();
}
else
{
    //Go ahead and process the line
    processCommandline(line);
    console.log("rl > Type in a path:");
}
});

function isQuit(s)
{
const quitLine = s.trim().toLowerCase();
if ( (quitLine == "q") || (quitLine == "quit"))
{
    return true;
}
return false;

}

function processCommandline(line)
{
    console.log(`Processing ${line}`)

    let path = "";
    if (u.isValid(line))
    {
        path = line;
    }
    printFtpListingsFor("wu1",path)
}
