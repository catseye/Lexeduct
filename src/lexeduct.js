#!/usr/bin/env node

var pipe = require('./lib/pipe');
var args = process.argv.slice(2);

var filter = undefined;

/*
 * Like mathematical https://en.wikipedia.org/wiki/Function_composition,
 * except with 'data' parameter also.
 */
var compose = function(g, f) {
    return function(line, data) {
        line = f(line, data);
        return g(line, data);
    };
};

/*
 * Load the filters that were specified on the command line.
 */
for (var i = 0; i < args.length; i++) {
    // TODO: parse filter parameters off end of args[i]
    var module = require('./filter/' + args[i]);
    var loadedFilter = module.makeFilter({});
    if (filter === undefined) {
        filter = loadedFilter;
    } else {
        filter = compose(loadedFilter, filter);
    }
}

var output = function(line) {
    process.stdout.write(line + "\n");
};

pipe.line(process.stdin, output, filter);
