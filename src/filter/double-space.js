module.exports = {
    filter: function(line, state) {
        var s = "";
        for (var i = 0; i < line.length; i++) {
            s += line.charAt(i) + " ";
        }
        return s;
    }
};
