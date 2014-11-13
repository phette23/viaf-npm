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
    'marcxml' : '/marc21.xml',
    'marchtml' : '/marc21.html', // basically same as above, forces an HTML download
    'unimarcxml' : '/unimarc.xml',
    'unimarchtml' : '/unimarc.html' // basically same as above, forces an HTML download
};

// used in SRU HTTP headers
viaf.searchResponseTypes = {
    'html' : 'text/html',
    'rss' : 'application/rss+xml',
    'xml' : 'text/xml',
};
// helper function
viaf.url = function (type) {
    // each time request is made, use viaf.requestOptions
    viaf.request = request.defaults(viaf.requestOptions);

    return viaf.scheme + '://' + viaf.domain + viaf.stems[type];
}

viaf.read = function (id, cb) {
    // needs a trailing slash or it returns 303
    return viaf.request(viaf.url('read') + id + '/', cb || null);
};

viaf.search = function (query, cb) {
    return viaf.request(viaf.url('search') + encodeURIComponent(query), cb || null);
};

// for predictability set up an alias
viaf.srusearch = viaf.search;

viaf.autosuggest = function (query, cb) {
    return viaf.request(viaf.url('autosuggest') + encodeURIComponent(query), cb || null);
};

// @todo AuthoritySource read

module.exports = viaf;
