var url = require('url');
var stream = require('stream');

function getQuery(req, callback) {
    var url_parts = url.parse(req.url, true);
    var query = url_parts.query;
    callback(query, req);
}
module.exports.getQuery = getQuery;

function getWritableStream(callback) {
    var writableStream = new stream.Writable();
    writableStream.data = []; // We'll store all the data inside this array
    writableStream._write = function (chunk, encoding, done) {
        this.data.push(chunk);
        done();
        return true;
    };
    writableStream.end = function(chunk) {
        if (chunk) {
            this.data.push(chunk);
        }
        var b = Buffer.concat(this.data); // Create a buffer from all the received chunks
        callback(b);
    };
    return writableStream;
}

module.exports.getWritableStream = getWritableStream;