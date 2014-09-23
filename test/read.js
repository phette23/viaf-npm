/*jshint unused:false */
var viaf = require('../viaf')
var sepia = require('sepia')

exports['Successful HTTP Request & Response'] = function (test) {
    viaf.read('102333412', function (err, resp, body) {
        test.strictEqual(err, null)
        test.equal(resp.statusCode, 200)
        test.ok(body)
        test.done()
    })
}
