#!/usr/bin/env node

var pipe = require('./lib/pipe');
var args = process.argv.slice(2);
var filters = [];

// TODO: actually use function composition here
for (var i = 0; i < args.length; i++) {
    var module = require('./filter/' + args[i]);
    filters.push(module.filter);
}

var output = function(line) {
    process.stdout.write(line + "\n");
};

pipe.line(process.stdin, output, function(line) {
    for (var i = 0; i < filters.length; i++) {
        line = filters[i](line);
    }
    return line;
});
