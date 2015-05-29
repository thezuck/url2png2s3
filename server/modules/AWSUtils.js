var config = require("../config/all.js");

var AWS = require('aws-sdk');
AWS.config.update({accessKeyId: config.AMAZON_ACCESS_KEY_ID, secretAccessKey: config.AMAZON_SECRET_ACCESS_KEY});
var s3 = new AWS.S3();

function storeFile (s3BucketName, path, file, metaData, callback) {
    console.log("Writing: s3BucketName:" + s3BucketName + ", Key: " + path);
    s3.putObject({
        Bucket: s3BucketName,
        Body: file,
        Key: path,
        ContentType: metaData.contentType
    }, callback);
}
module.exports.storeFile = storeFile;
