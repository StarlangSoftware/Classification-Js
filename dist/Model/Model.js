(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "../Instance/Instance", "nlptoolkit-datastructure/dist/CounterHashMap", "../InstanceList/InstanceList", "nlptoolkit-math/dist/Matrix", "nlptoolkit-math/dist/DiscreteDistribution"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Model = void 0;
    const Instance_1 = require("../Instance/Instance");
    const CounterHashMap_1 = require("nlptoolkit-datastructure/dist/CounterHashMap");
    const InstanceList_1 = require("../InstanceList/InstanceList");
    const Matrix_1 = require("nlptoolkit-math/dist/Matrix");
    const DiscreteDistribution_1 = require("nlptoolkit-math/dist/DiscreteDistribution");
    class Model {
        /**
         * Given an array of class labels, returns the maximum occurred one.
         *
         * @param classLabels An array of class labels.
         * @return The class label that occurs most in the array of class labels (mod of class label list).
         */
        static getMaximum(classLabels) {
            let frequencies = new CounterHashMap_1.CounterHashMap();
            for (let label of classLabels) {
                frequencies.put(label);
            }
            return frequencies.max();
        }
        loadInstance(line, attributeTypes) {
            let items = line.split(",");
            let instance = new Instance_1.Instance(items[items.length - 1]);
            for (let i = 0; i < items.length - 1; i++) {
                switch (attributeTypes[i]) {
                    case "DISCRETE":
                        instance.addAttribute(items[i]);
                        break;
                    case "CONTINUOUS":
                        instance.addAttribute(parseFloat(items[i]));
                        break;
                }
            }
            return instance;
        }
        static loadDiscreteDistribution(input) {
            let distribution = new DiscreteDistribution_1.DiscreteDistribution();
            let size = parseInt(input.readLine());
            for (let i = 0; i < size; i++) {
                let line = input.readLine();
                let items = line.split(" ");
                let count = parseInt(items[1]);
                for (let j = 0; j < count; j++) {
                    distribution.addItem(items[0]);
                }
            }
            return distribution;
        }
        loadInstanceList(input) {
            let types = input.readLine().split(" ");
            let instanceCount = parseInt(input.readLine());
            let instanceList = new InstanceList_1.InstanceList();
            for (let i = 0; i < instanceCount; i++) {
                instanceList.add(this.loadInstance(input.readLine(), types));
            }
            return instanceList;
        }
        loadMatrix(input) {
            let items = input.readLine().split(" ");
            let matrix = new Matrix_1.Matrix(parseInt(items[0]), parseInt(items[1]));
            for (let j = 0; j < matrix.getRow(); j++) {
                let line = input.readLine();
                items = line.split(" ");
                for (let k = 0; k < matrix.getColumn(); k++) {
                    matrix.setValue(j, k, parseFloat(items[k]));
                }
            }
            return matrix;
        }
    }
    exports.Model = Model;
});
//# sourceMappingURL=Model.js.map