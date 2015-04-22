module.exports = {
    makeFilter: function(cfg) {
        return function(line, state) {
            var s = "";
            for (var i = 0; i < line.length; i++) {
                var c = line.charAt(i);
                if (cfg.chars.lastIndexOf(c) === -1) {
                    s += c;
                }
            }
            return s;
        };
    }
};
