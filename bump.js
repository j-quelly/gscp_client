/**
 * Usage:
 * Change directory to project folder
 * node /path/to/script versionNumber
 */
const fs = require('fs');

// File Location
const mdFile = "./README.md";
const packageFile = "./package.json";

// Require a version to update
if (process.argv[2] === undefined){
    throw new Error("Missing version string for update");
}

// Read MD file
fs.readFile(mdFile, 'utf8' ,(err, data) => {
    if (err){
        throw new Error(err);
    }

    // String replacement
    let newVersion = data.replace(/\# GSCP Client \d{1,}\.\d{1,}\.\d{1,}/, '# GSCP Client ' + process.argv[2]);

    // Output
    fs.writeFile(mdFile, newVersion, 'utf-8', (err) => {
        if (err){
            throw new Error(err);
        }

        console.log("Version updated in md file");
    });
    
});

// Package.JSON Update
fs.readFile(packageFile, (err, data) => {
    if (err){
        throw new Error(err);
    }

    // Parse JSON
    let parsedData = JSON.parse(data);
    parsedData.version = process.argv[2];
    let newData = JSON.stringify(parsedData);

    // Write Update
    fs.writeFile(packageFile, newData, (err) => {
        if (err){
            throw new Error(err);
        }
        console.log("Package Json file updated");
    });
});

// Complete
console.log("Version Update Complete");