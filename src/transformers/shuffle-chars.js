module.exports = {
    makeTransformer: function(cfg) {
        return function(str, state) {
            var s = "";
            var len = str.length;
            for (var i = 0; i < len; i++) {
                var index = Math.floor(Math.random() * str.length);
                s += str.charAt(index);
                str = str.slice(0, index) + str.slice(index + 1, str.length);
            }
            return s;
        };
    },
    parameters: {},
    description: "Randomly re-order all characters found"
};
