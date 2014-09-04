// Prints nicely indented XML of a VIAF entry to your terminal
// Defaults to Jane Austen but you can pass a VIAF ID on the command line:
// node print-viaf-xml 89798474
var viaf = require('../viaf')
    , pd = require('pretty-data').pd
    , id = process.argv[2] || "102333412";

viaf.read('102333412', function (err, resp, xml) {
    process.stdout.write(pd.xml(xml));
});
