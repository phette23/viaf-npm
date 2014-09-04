var viaf = require('../viaf')
var dns = require('dns')

// check if we can even connect to viaf.org
// exit if not; tests rely on HTTP
dns.resolve('viaf.org', function (err) {
    if (err) {
        console.log('Unable to resolve viaf.org address. Are you connected to the interwebs?');
        process.exit();
    }
})

exports['Successful HTTP Request & Response'] = function (test) {
    viaf.read('102333412', function (err, resp, body) {
        test.strictEqual(err, null)
        test.equal(resp.statusCode, 200)
        test.ok(body)
        test.done()
    })
}
