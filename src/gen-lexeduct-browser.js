#!/usr/bin/env node

fs = require('fs');

function write(s) {
    process.stdout.write(s + "\n");
}

write("module = {};");
write("makeTransformer = {};");
var dirname = 'transformers';
var files = fs.readdirSync(dirname);
for (var i = 0; i < files.length; i++) {
    var filename = files[i];
    var transformerName = filename.split('.js')[0];
    var text = fs.readFileSync(dirname + '/' + filename);
    write(text);
    write("makeTransformer['" + transformerName + "'] = module.exports.makeTransformer;");
}
