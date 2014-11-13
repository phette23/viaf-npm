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

// all the data type tests look similar
// I'm not testing every type because it's silly & takes a lot of HTTP requests
// all (except JSON) check that the first line of the body looks right
// typically involving an xmlns match
exports['Handles XML request'] = function (test) {
    viaf.read('102333412', 'xml', function (err, resp, body) {
        var typeString = '<ns2:VIAFCluster xmlns="http://viaf.org/viaf/terms#" ';
        test.strictEqual(err, null)
        test.equal(resp.statusCode, 200)
        test.ok(body.match(typeString));
        test.done()
    })
}

exports['Handles RDF request'] = function (test) {
    viaf.read('102333412', 'rdf', function (err, resp, body) {
        var typeString = '<rdf:RDF xmlns:rdf="http://www.w3.org/1999/02/22-rdf-syntax-ns#" ';
        test.strictEqual(err, null)
        test.equal(resp.statusCode, 200)
        test.ok(body.match(typeString));
        test.done()
    })
}

exports['Handles RSS request'] = function (test) {
    viaf.read('102333412', 'rss', function (err, resp, body) {
        var typeString = '<rss xmlns:opensearch="http://a9.com/-/spec/opensearch/1.1/" ';
        test.strictEqual(err, null)
        test.equal(resp.statusCode, 200)
        test.ok(body.match(typeString));
        test.done()
    })
}

exports['Handles MARC21 XML request'] = function (test) {
    viaf.read('102333412', 'marc21', function (err, resp, body) {
        var typeString = '<mx:record xmlns:mx="http://www.loc.gov/MARC21/slim" ';
        test.strictEqual(err, null)
        test.equal(resp.statusCode, 200)
        test.ok(body.match(typeString));
        test.done()
    })
}

// since JSON-parsing is built into JS, might as well check that we get a valid response
exports['Handles JSON links request'] = function (test) {
    viaf.read('102333412', 'json', function (err, resp, body) {
        var data = JSON.parse(body)

        test.strictEqual(err, null)
        test.equal(resp.statusCode, 200)
        test.ok(data)
        test.ok(data.viafID)
        test.done()
    })
}
