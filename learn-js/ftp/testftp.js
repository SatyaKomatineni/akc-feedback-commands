
const ftp = require("basic-ftp");
const readenv = require("./readenv");

async function getNamesfromFtpLocation(ftpSiteName) {
    const client = new ftp.Client()
    client.ftp.verbose = true
    let dirListing;
    try {
        const ftpHostSpec = new readenv.createHostSpecFromEnv(ftpSiteName);

        //wait to succeed to 
        console.log("waiting to connect to:" + ftpHostSpec.name);
        await client.access({
            host: ftpHostSpec.ip,
            user: ftpHostSpec.user,
            password: ftpHostSpec.password
            //,secure: true
        })

        //finished logging in
        console.log("Successful login");

        //wait to get a list of what the site has to offer
        console.log("wait for a list of files");
        dirListing = await client.list();
        console.log("listing of files");
        console.log(dirListing);
    }
    catch(err) {
        console.log(err)
    }
    console.log("closing the ftp connection")
    client.close()

    return dirListing;
}

//lets call the function

let dirListing  = getNamesfromFtpLocation("wu1");
