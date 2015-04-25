"use strict";

/* REQUIRES yoob/element-factory.js */
/* ASSUMES ``transformer`` object has been created */

var compose = function(g, f) {
    return function(str, data) {
        str = f(str, data);
        return g(str, data);
    };
};

function LexeductUI() {
    var container, input, output, processButton, tranformersPanel;
    var liveMode;
    var MAX_TRANSFORMER_SLOTS = 8; // TODO dynamic
    var transformerSlots = [];
    var transformerNames;

    this.init = function(cfg) {
        container = document.getElementById('container');
        input = yoob.makeTextArea(container, 40, 20);
        input.value = document.getElementById('initial-text').innerHTML;
        
        var transformersPanel = yoob.makeDiv(container);
        transformersPanel.style.border = "2px solid black";
        transformersPanel.style.display = "inline-block";
        transformersPanel.style.verticalAlign = "top";

        transformerNames = [["identity", "---"]];
        for (var key in transformer) {
            if (key !== 'identity' && transformer.hasOwnProperty(key)) {
                transformerNames.push([key, key]);
            }
        }

        processButton = yoob.makeButton(transformersPanel, "Process", this.process);

        yoob.makeCheckbox(transformersPanel, false, "Live mode", function(b) {
            liveMode = b;
        });
        yoob.makeLineBreak(transformersPanel);

        for (var i = 0; i < MAX_TRANSFORMER_SLOTS; i++) {
            var slot = this.makeTransformerSlot(transformersPanel, i);
            transformerSlots.push(slot);
        }

        output = yoob.makeTextArea(container, 40, 20);
    };

    this.process = function() {
        var t = transformer['identity'].makeTransformer({});
        for (var i = 0; i < transformerSlots.length; i++) {
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

    this.updateParametersPanel = function(slot, panel) {
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

    this.makeTransformerSlot = function(container, index) {
        var select = yoob.makeSelect(
            container, "Transformer " + (index+1), transformerNames
        );
        yoob.makeLineBreak(container);
        var parametersPanel = yoob.makeDiv(container);
        parametersPanel.style.padding = "2px";
        parametersPanel.style.border = "1px solid blue";
        parametersPanel.style.textAlign = "right";

        var $this = this;
        select.onchange = function(e) {
            transformerSlots[index].name = select.options[select.selectedIndex].value;
            $this.updateParametersPanel(transformerSlots[index], parametersPanel);
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

};
