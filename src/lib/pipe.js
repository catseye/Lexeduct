module.exports = {
    line: function(infile, output, processLine) {
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
                output(processLine(lines[i], state));
            }
        });

        infile.on('end', function() {
            output(processLine(buffer, state));
        });
    }
};
