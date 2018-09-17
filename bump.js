/**
 * Usage:
 * Change directory to project folder
 * node /path/to/script versionNumber
 */
const fs = require('fs');
const encoding = 'utf-8';

// File Location
const updateVersions = [
    mdFile =  {
        "path" : "./README.md",
        "pattern": /\d{1,}\.\d{1,}\.\d{1,}/
    },
    packageFile = {
        "path" : "./package.json",
        "pattern": /\d{1,}\.\d{1,}\.\d{1,}/
    }
]

// Require a version to update
if (process.argv[2] === undefined){
    throw new Error("Missing version string for update");
}

for (let i = 0; i < updateVersions.length; i++){
    fs.readFile(updateVersions[i].path, encoding, (err , data) => {
        if (err){
            // Error
            console.log(err);
        } else {
            // Replace String
            let newVersion = data.replace(updateVersions[i].pattern, process.argv[2]);

            // Output
            fs.writeFile(updateVersions[i].path, newVersion, encoding, (err) => {
                // Error
                if (err){
                    console.log(err);
                }
            });
        }
    });
}