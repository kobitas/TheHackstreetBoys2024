const mongoose = require('mongoose');
var fs = require('fs');
const multiparty = require('multiparty');
const {join} = require("path");
const {writeFile} = require("fs/promises");
const {parse} = require("dotenv");
const { InfoObject } = require('../documents/infoObject');
//const db = require("../documents/");
//const InfoObject = db.InfoObject;

exports.create = (req, res) => {
    var form = new multiparty.Form();
    let parsedFiles = [];
    form.parse(req, function(err, fields, files) {
        // fields fields fields
        console.log(files);
        parsedFiles = files.files.map(async file => {
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
            };
        });
        console.log(JSON.stringify(parsedFiles));
        //Save files into monbodb
        parsedFiles.forEach(async file => {
           InfoObject.create({name: file.name, size: file.size, type: file.type, updatedAt: file.lastModified, linkToFile: file.path});
        });

    });
    // For further completeness end initial request and process the files individually based on there type

    res.send('OK');
    parsedFiles.forEach(file => {
        const formData = new FormData()

        formData.append('file', file)

        if (file.type.includes('image/')) {
            fetch('ocr:3000/api/image', {
                method: 'POST',
                body: formData,
            })
                .then(r => r.json() )
                .then(json => {
                let { content, filename }  = json;
                InfoObject.findOneAndUpdate({name: filename}, { content: content});
            });
        } else if (file.type.includes('application/pdf') || file.type.includes('application/msword') || file.type.includes('application/rtf') || file.type.includes('application/vnd.oasis.opendocument')) {
            fetch('ocr:3000/api/pdf', {
                method: 'POST',
                body: formData,
            })
                .then(r => r.json() )
                .then(json => {
                let { content, filename } = json;
                    InfoObject.findOneAndUpdate({name: filename}, { content: content});
            })
        }
    })


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