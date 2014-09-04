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
viaf.requestOptions = {
    headers: {
        'Accept-Charset': 'UTF-8'
    }
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
