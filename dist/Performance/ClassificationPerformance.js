(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "./Performance"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.ClassificationPerformance = void 0;
    const Performance_1 = require("./Performance");
    class ClassificationPerformance extends Performance_1.Performance {
        /**
         * A constructor that sets the accuracy and errorRate via given input.
         *
         * @param accuracy  Double value input.
         * @param errorRate Double value input.
         */
        constructor(accuracy, errorRate) {
            super(errorRate == undefined ? 1 - accuracy : errorRate);
            this.accuracy = accuracy;
        }
        /**
         * Accessor for the accuracy.
         *
         * @return Accuracy value.
         */
        getAccuracy() {
            return this.accuracy;
        }
    }
    exports.ClassificationPerformance = ClassificationPerformance;
});
//# sourceMappingURL=ClassificationPerformance.js.map