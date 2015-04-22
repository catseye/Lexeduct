#!/usr/bin/env node

/*** FUNCTIONS ***/

/*
 * Like mathematical https://en.wikipedia.org/wiki/Function_composition,
 * except with 'data' parameter also.
 */
var compose = function(g, f) {
    return function(str, data) {
        str = f(str, data);
        return g(str, data);
    };
};

/*
 * Implement the pipeline, streaming, from the input file, using the
 * given transformer, calling the given output function at the end of the pipe.
 */
var pipeline = function(infile, output, transformer) {
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
            output(transformer(lines[i], state));
        }
    });

    infile.on('end', function() {
        output(transformer(buffer, state));
    });
};

/*
 * Load the transformers that were specified on the command line.
 */
var loadTransformers = function(args) {
    var transformer = undefined;
    var cfg = {};

    for (var i = 0; i < args.length; i++) {
        var paramPair = args[i].split('=');
        if (paramPair.length == 2) {
            cfg[paramPair[0]] = paramPair[1];
        } else {
            var module = require('./transformers/' + args[i]);
            var loadedTransformer = module.makeTransformer(cfg);
            cfg = {};
            if (transformer === undefined) {
                transformer = loadedTransformer;
            } else {
                transformer = compose(loadedTransformer, transformer);
            }
        }
    }
    return transformer;
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
    var transformer = loadTransformers(args);
    pipeline(process.stdin, output, transformer);
})();
