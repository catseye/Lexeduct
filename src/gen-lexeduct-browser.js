#!/usr/bin/env node

fs = require('fs');

function write(s) {
    process.stdout.write(s + "\n");
}

write("module = {};");
write("makeFilter = {};");
var files = fs.readdirSync('filter');
for (var i = 0; i < files.length; i++) {
    var filename = files[i];
    var filterName = filename.split('.js')[0];
    var text = fs.readFileSync('filter/' + filename);
    write(text);
    write("makeFilter['" + filterName + "'] = module.exports.makeFilter;");
}
