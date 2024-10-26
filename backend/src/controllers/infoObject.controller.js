//import {mongoose} from "../index";
var fs = require('fs');
const multiparty = require('multiparty');
const {join} = require("path");
const {writeFile} = require("fs/promises");
const {parse} = require("dotenv");
//const db = require("../documents");
//const InfoObject = db.InfoObject;

exports.create = (req, res) => {
    var form = new multiparty.Form();
    form.parse(req, function(err, fields, files) {
        // fields fields fields
        console.log(files);
        const parsedFiles = files.files.map(async file => {
            // Convert File to ArrayBuffer
            const buffer = fs.readFileSync(file.path);
            // const bytes = await file.arrayBuffer()
            // const buffer = Buffer.from(bytes)

            // Create path on desktop with unique name
            const filePath = join('./', `upload_${Date.now()}_${file.originalFilename}`);

            console.log(JSON.stringify(file.headers));

            // Save file
            await writeFile(filePath, buffer)

            return {
                name: file.originalFilename,
                size: file.size,
                type: file.headers['content-type'],
                lastModified: file.lastModified,
                path: filePath
            }
        });
        console.log(JSON.stringify(parsedFiles));

    });

    // let tmp_path = req.files.thumbnail.path;
    // let target_path = './public/images/' + req.files.thumbnail.name;
    // fs.rename(tmp_path, target_path, function(err) {
    //     if (err) throw err;
    //     fs.unlink(tmp_path, function() {
    //         if (err) throw err;
    //         res.send('File uploaded to: ' + target_path + ' - ' + req.files.thumbnail.size + ' bytes');
    //     });
    // });
};

exports.duplicateCheck = (req, res, next) => {
    const { fileName, metaData, hash, fileEncoding } = req.body;
    // InfoObject.findOne({ name: fileName, hash, fileEncoding }, (err, document) => {
    //     if (err) return next(err);
    //     if (!document) {
    //
    //     }
    // });
}

// Retrieve all InfoObjects from the database.
exports.findAll = (req, res) => {

};

// Find a single Tutorial with an id
exports.findOne = (req, res) => {

};

// Update a Tutorial by the id in the request
exports.update = (req, res) => {

};

// Delete a Tutorial with the specified id in the request
exports.delete = (req, res) => {

};

// Delete all Tutorials from the database.
exports.deleteAll = (req, res) => {

};

// Find all published Tutorials
exports.findAllPublished = (req, res) => {

};

exports.findAllExpired = (req, res) => {
    const { user } = req.body;

    //take all documents which are expired to send a notification to the user.
}