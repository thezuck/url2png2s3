var _ = require('lodash')
    , Utils = require('./Utils')
    , snapshot = require('../modules/snapshot');

var routes = [
    {
        path: '/',
            httpMethod: 'GET',
            middleware: [function (req, res) {
             res.sendfile('public/index.html');
        }]
    },
    {
        path: '/capture',
        httpMethod: 'GET',
        middleware: [function (req, res) {
            Utils.getQuery(req, function(query) {
                snapshot.triggerSingleScreenCapture(res, query.url);
            });
        }]
    }
];

module.exports = function(app) {
    _.each(routes, function(route) {
        var args = _.flatten([route.path, route.middleware]);

        switch(route.httpMethod.toUpperCase()) {
            case 'GET':
                app.get.apply(app, args);
                break;
            case 'POST':
                app.post.apply(app, args);
                break;
            case 'PUT':
                app.put.apply(app, args);
                break;
            case 'DELETE':
                app.delete.apply(app, args);
                break;
            default:
                throw new Error('Invalid HTTP method specified for route ' + route.path);
                break;
        }
    });
}
