
const ftp = require("basic-ftp");
const readenv = require("./readenv");
const u = require("./ftputils");

async function getNamesfromFtpLocation(ftpSiteName) {
    const client = new ftp.Client()
    client.ftp.verbose = true
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
        dirListing = await client.list();
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
}

async function printFtpListingsFor(ftpSiteName)
{
    // {Promise<any>} dirListingPromise
    // {FileInfo[]} ftpListingArray 
    let ftpListingArray = await getNamesfromFtpLocation(ftpSiteName);
    workWithListings(ftpListingArray);
}

printFtpListingsFor("someUnknownFtp");