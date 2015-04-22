module.exports = {
    makeFilter: function(cfg) {
        return function(line, state) {
            var s = "";
            var vowels = "aeiou";
            for (var i = 0; i < line.length; i++) {
                s += line.charAt(i) + vowels.charAt(Math.floor(Math.random() * vowels.length));
            }
            return s;
        };
    }
};
