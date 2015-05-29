var imagestore = require("./ImageStoreUtils.js");
var config = require("../config/all.js");

function saveImage (file, callback) {
    imagestore.saveImage(config.s3BucketName, 'myspecialwebshot.png', file, 'png', callback);
}

module.exports.saveImage = saveImage;


