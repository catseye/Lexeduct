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
    var MAX_TRANSFORMER_SLOTS = 8; // TODO dynamic
    var transformerSlots = [];
    var transformerNames;

    this.init = function(cfg) {
        var $this = this;

        container = cfg.container;
        cfg.liveMode = !!cfg.liveMode;

        input = yoob.makeTextArea(container, 40, 20, cfg.initialText);
        input.oninput = function() {
            if ($this.liveMode) {
                $this.process();
            }
        };

        var transformersPanel = yoob.makeDiv(container);
        transformersPanel.style.border = "1px solid black";
        transformersPanel.style.padding = "2px";
        transformersPanel.style.margin = "2px";
        transformersPanel.style.display = "inline-block";
        transformersPanel.style.verticalAlign = "top";

        transformerNames = [["identity", "---"]];
        for (var key in transformer) {
            if (key !== 'identity' && transformer.hasOwnProperty(key)) {
                transformerNames.push([key, key]);
            }
        }

        processButton = yoob.makeButton(transformersPanel, "Process", this.process);
        yoob.makeCheckbox(transformersPanel, cfg.liveMode, "Live mode", function(b) {
            $this.setLiveMode(b);
        });
        yoob.makeLineBreak(transformersPanel);

        for (var i = 0; i < MAX_TRANSFORMER_SLOTS; i++) {
            var slot = this.makeTransformerSlot(transformersPanel, i);
            transformerSlots.push(slot);
        }

        output = yoob.makeTextArea(container, 40, 20);

        this.setLiveMode(cfg.liveMode);
    };

    this.setLiveMode = function(b) {
        this.liveMode = b;
        processButton.disabled = b;
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
        for (var paramName in parameters) {
            if (parameters.hasOwnProperty(paramName)) {
                var desc = parameters[paramName][0];
                var def = parameters[paramName][1];
                this.makeParameterEditor(slot, panel, paramName, desc, def);
            }
        }
    };

    this.makeParameterEditor = function(slot, panel, paramName, desc, def) {
        var label = yoob.makeSpan(panel, paramName);
        var paramInput = yoob.makeTextInput(panel, 24, def);
        slot.selectedParams[paramName] = def;
        var $this = this;
        paramInput.oninput = function() {
            slot.selectedParams[paramName] = paramInput.value;
            if ($this.liveMode) {
                $this.process();
            }
        };
        yoob.makeLineBreak(panel);
    };

    this.makeTransformerSlot = function(container, index) {
        var slotPanel = yoob.makeDiv(container);
        slotPanel.style.padding = "2px";
        slotPanel.style.margin = "2px";
        slotPanel.style.border = "1px solid black";
        var select = yoob.makeSelect(
            slotPanel, "Transformer " + (index+1), transformerNames
        );
        yoob.makeLineBreak(slotPanel);
        var parametersPanel = yoob.makeDiv(slotPanel);
        parametersPanel.style.textAlign = "right";

        var $this = this;
        select.onchange = function(e) {
            transformerSlots[index].name = select.options[select.selectedIndex].value;
            $this.updateParametersPanel(transformerSlots[index], parametersPanel);
            if ($this.liveMode) {
                $this.process();
            }
        };

        return {
            name: 'identity',
            selectedParams: {}
        };
    };

};
