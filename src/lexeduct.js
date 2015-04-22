#!/usr/bin/env node

/*** FUNCTIONS ***/

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
 * Implement the pipeline, streaming, from the input file, using the
 * given filter, calling the given output function at the end of the pipe.
 */
var pipeline = function(infile, output, filter) {
    var buffer = "";
    var state = {};

    infile.resume();
    infile.setEncoding('utf8');

    infile.on('data', function(data) {
        data = data.replace(/\r/g, '');
        var lines = data.split("\n");

        lines[0] = buffer + lines[0];
        buffer = lines[lines.length - 1];

        for (var i = 0; i < lines.length - 1; i++) {
            output(filter(lines[i], state));
        }
    });

    infile.on('end', function() {
        output(filter(buffer, state));
    });
};

/*
 * Load the filters that were specified on the command line.
 */
var loadFilters = function(args) {
    var filter = undefined;
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
    return filter;
};

/*
 * End-of-pipe callback used for pipeline().
 */
var output = function(line) {
    process.stdout.write(line + "\n");
};

/*** MAIN ***/

/*
 * Enclosed in an anonymous function so that we don't have to worry about
 * shadowing the name of an already-used variable.
 */
(function() {
    var args = process.argv.slice(2);
    var filter = loadFilters(args);
    pipeline(process.stdin, output, filter);
})();
