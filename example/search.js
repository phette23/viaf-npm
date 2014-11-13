// print VIAF seach results with links to their VIAF pages
// defaults to Nietzsche but you can pass a search term on the command line:
// node search 'phetteplace'
var viaf = require('../viaf')
var query = process.argv[2] || 'nietzsche'

viaf.autosuggest(query, function(err, response, body) {
    var results = JSON.parse(body).result

    if (results === null) {
        console.log('No VIAF results :(')
        process.exit(0)
    }

    console.log('VIAF Search Results:\n')

    results.forEach(function(item, index) {
        console.log('Term:', item.term)
        console.log('VIAF URL:', viaf.url('read') + item.viafid, '\n')
    })
})
