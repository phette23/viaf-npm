var request = require('request');
var viaf = {};

// URLs
viaf.scheme = 'http';
viaf.domain = 'viaf.org';
viaf.stems = {
    read: '/viaf/',
    search: '/viaf/search?query=',
    autosuggest: '/viaf/AutoSuggest?query='
};
// default request options
// only safe default types are html, rss, & xml
viaf.defaultDataType = 'xml';
viaf.requestOptions = {
    headers: {
        'Accept-Charset': 'UTF-8'
    }
};

// VIAF's many data types, all listed on
// https://www.oclc.org/developer/develop/web-services/viaf/authority-cluster.en.html
// keep these properties all lowercase without hyphens
// parameters will be lowercased & have hyphens stripped before being compared against

// appended onto the end of data (read) request URLs
viaf.dataResponseTypes = {
    'html' : '/', // VIAF's default so just requires a trailing slash
    'xml' : '/viaf.xml',
    'json' : '/justlinks.json', // just links
    'rdf' : '/rdf.xml',
    'jsonld' : '/viaf.jsonld',
    'rss' : '/rss.xml',
    'marc' : '/marc21.xml',
    'marc21' : '/marc21.xml',
    'marcxml' : '/marc21.xml',
    'marchtml' : '/marc21.html', // basically same as above, forces an HTML download
    'unimarc' : '/unimarc.xml',
    'unimarcxml' : '/unimarc.xml',
    'unimarchtml' : '/unimarc.html' // basically same as above, forces an HTML download
};

// used in SRU HTTP headers
viaf.searchResponseTypes = {
    'html' : 'text/html',
    'rss' : 'application/rss+xml',
    'xml' : 'text/xml',
};

function isFunc(obj) {
    return obj && {}.toString.call(obj) === '[object Function]';
}

// helper function
viaf.url = function (type) {
    // each time request is made, use viaf.requestOptions
    viaf.request = request.defaults(viaf.requestOptions);

    return viaf.scheme + '://' + viaf.domain + viaf.stems[type];
}

viaf.read = function (id, dataType, cb) {
    var url = viaf.url('read') + id;

    // handle v.read(id, callback) signature
    if (isFunc(dataType)) {
        cb = dataType;
        dataType = viaf.defaultDataType;
    }

    // normalize string params, e.g. JSON-LD will still end up jsonld
    dataType = dataType.replace('-','').toLowerCase();

    return viaf.request(url + viaf.dataResponseTypes[dataType], cb || null);
};

viaf.search = function (query, dataType, cb) {
    var url = viaf.url('search');

    // handle v.search(id, callback) signature
    if (isFunc(dataType)) {
        cb = dataType;
        dataType = viaf.defaultDataType;
    }

    return viaf.request(url + encodeURIComponent(query), cb || null);
};

// for predictability set up an alias
viaf.srusearch = viaf.search;

viaf.autosuggest = function (query, cb) {
    var url = viaf.url('autosuggest');

    return viaf.request(url + encodeURIComponent(query), cb || null);
};

// @todo AuthoritySource read
// @todo viaf.translate(lccn, getty, etc.) => returns VIAF ID (or full record?)

module.exports = viaf;
