"use strict";

/* REQUIRES yoob/element-factory.js */

var compose = function(g, f) {
    return function(str, data) {
        str = f(str, data);
        return g(str, data);
    };
};

var container, input, output, processButton, tranformersPanel;

container = document.getElementById('container');
input = yoob.makeTextArea(container, 40, 20);
input.value = document.getElementById('initial-text').innerHTML;

var transformersPanel = yoob.makeDiv(container);
transformersPanel.style.border = "2px solid black";
transformersPanel.style.display = "inline-block";
transformersPanel.style.verticalAlign = "top";

var MAX_TRANSFORMER_SLOTS = 8; // TODO dynamic
var transformerSlots = [];

var transformerNames = [["identity", "---"]];
for (var key in transformer) {
    if (key !== 'identity' && transformer.hasOwnProperty(key)) {
        transformerNames.push([key, key]);
    }
}

var parseOptions = function(text) {
    var args = text.split(' ');
    var cfg = {};
    for (var i = 0; i < args.length; i++) {
        var paramPair = args[i].split('=');
        if (paramPair.length == 2) {
            cfg[paramPair[0]] = paramPair[1];
        } else {
            // register an error
        }
    }
    return cfg;
};

var process = function() {
    var t = transformer['identity'].makeTransformer({});
    for (var i = 0; i < transformerSlots.length; i++) {
        console.log(uneval(transformerSlots[i]));
        var transformerName = transformerSlots[i].name;
        var selectedParams = transformerSlots[i].selectedParams;
        var t2 = transformer[transformerName].makeTransformer(selectedParams);
        t = compose(t2, t);
    }
    var inLines = input.value.split('\n');
    var outLines = [];
    for (var i = 0; i < inLines.length; i++) {
        outLines.push(t(inLines[i]));
    }
    output.value = outLines.join('\n');
};

processButton = yoob.makeButton(transformersPanel, "Process", process);

var liveMode;
yoob.makeCheckbox(transformersPanel, false, "Live mode", function(b) {
    liveMode = b;
});
yoob.makeLineBreak(transformersPanel);

var updateParametersPanel = function(slot, panel) {
    var parameters = transformer[slot.name].parameters;
    panel.innerHTML = "";  // delete any previous controls
    for (var key in parameters) {
        if (parameters.hasOwnProperty(key)) {
            var desc = parameters[key][0];
            var def = parameters[key][1];
            var label = yoob.makeSpan(panel, key);
            var input = yoob.makeTextInput(panel, 24, def);
            slot.selectedParams[key] = def;
            input.onchange = function() {
                slot.selectedParams[key] = input.value;
                if (liveMode) {
                    process();
                }
            }
            yoob.makeLineBreak(panel);
        }
    }
};

var makeTransformerSlot = function(container, index) {
    var select = yoob.makeSelect(
        transformersPanel, "Transformer " + (index+1), transformerNames
    );
    yoob.makeLineBreak(transformersPanel);
    var parametersPanel = yoob.makeDiv(transformersPanel);
    parametersPanel.style.padding = "2px";
    parametersPanel.style.border = "1px solid blue";
    parametersPanel.style.textAlign = "right";

    select.onchange = function(e) {
        transformerSlots[index].name = select.options[select.selectedIndex].value;
        updateParametersPanel(transformerSlots[index], parametersPanel);
        if (liveMode) {
            process();
        }
    };

    return {
        name: 'identity',
        selectedParams: {},
        select: select,
        parametersPanel: parametersPanel
    };
};

for (var i = 0; i < MAX_TRANSFORMER_SLOTS; i++) {
    var slot = makeTransformerSlot(transformersPanel, i);
    transformerSlots.push(slot);
}

output = yoob.makeTextArea(container, 40, 20);
