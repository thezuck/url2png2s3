var config = require("../config/all.js");

var utils = require('../routes/Utils');
var _ = require('lodash');
var webshotStore = require('./webshotStore');
var url2png = require('url2png')(config.URL2PNG_APIKEY, config.URL2PNG_PRIVATEKEY);
var moment = require('moment');
moment().format();

function triggerSingleScreenCapture(res, url) {
    screenCapture(url, function(err) {
        if (err) {
            res.status(500);
            res.send("Error: " + err);
        } else {
            res.status(200);
            res.send("Done");
        }
    });
}
exports.triggerSingleScreenCapture = triggerSingleScreenCapture;

function screenCapture(url, callback) {
    screenCaptureUsingUrl2Png(url, callback);
}

function screenCaptureUsingUrl2Png(url, callback) {
    try {
        var options = {
            delay: 15,
            unique: moment().format('YYYY-MM-DD-HH') // make unique every hour
        };
        var imageStream = utils.getWritableStream(function(buffer) {
            if (!buffer || buffer.length < 2000) { // assume fail if the image size is less than 2k
                console.log("Unable to capture webshot for url " + url);
            } else {
                console.log("Webshot get image success for url " + url);
                console.log("File length: " + (buffer.length / 1000) + "kb");
                webshotStore.saveImage(buffer, function(err, data) {
                    if (err) {
                        console.log("Unable to capture webshot for url " + url + ", failed to write to s3!");
                        console.log("Error:" + err);
                    } else {
                        console.log("Webshot success, saved webshot in S3 for url " + url);
                    }
                    if (callback) {
                        callback(err);
                    }
                });
            }
        });
        console.log("Processing: " + url);
        url2png.readURL(url, options).pipe(imageStream);
    } catch (e) {
        console.error("Unable to capture webshot for url " + url + ", failed with exception!", e);
        if (callback) {
            callback("Error: " + e.message);
        }
    }
}

