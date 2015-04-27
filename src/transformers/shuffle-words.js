module.exports = {
    makeTransformer: function(cfg) {
        return function(str, state) {
            var words = str.split(/\s+/);
            var acc = [];
            var len = words.length;
            for (var i = 0; i < len; i++) {
                var index = Math.floor(Math.random() * words.length);
                acc.push(words[index]);
                words = words.slice(0, index).concat(words.slice(index + 1, words.length));
            }
            return acc.join(' ');
        };
    },
    parameters: {},
    description: "Randomly re-order all words found"
};
