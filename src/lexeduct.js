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

for (var i = 0; i < args.length; i++) {
    var module = require('./filter/' + args[i]);
    if (filter === undefined) {
        filter = module.filter;
    } else {
        filter = compose(module.filter, filter);
    }
}

var output = function(line) {
    process.stdout.write(line + "\n");
};

pipe.line(process.stdin, output, filter);
