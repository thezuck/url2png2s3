var aws = require("./AWSUtils.js");

function saveImage (s3BucketName, path, file, type, callback) {
    var metaData = {};
    if (type && (type.toLowerCase() == "svg")) {
        metaData.contentType = "image/svg+xml";
    } else
    if (type) {
        metaData.contentType = "image/"+type.toLowerCase();
    }
    aws.storeFile(s3BucketName, path, file, metaData, callback);
}

module.exports.saveImage = saveImage;
