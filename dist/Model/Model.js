(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "nlptoolkit-datastructure/dist/CounterHashMap"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Model = void 0;
    const CounterHashMap_1 = require("nlptoolkit-datastructure/dist/CounterHashMap");
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
    }
    exports.Model = Model;
});
//# sourceMappingURL=Model.js.map