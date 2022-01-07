(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "./ClassificationPerformance"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.DetailedClassificationPerformance = void 0;
    const ClassificationPerformance_1 = require("./ClassificationPerformance");
    class DetailedClassificationPerformance extends ClassificationPerformance_1.ClassificationPerformance {
        /**
         * A constructor that  sets the accuracy and errorRate as 1 - accuracy via given {@link ConfusionMatrix} and also sets the confusionMatrix.
         *
         * @param confusionMatrix {@link ConfusionMatrix} input.
         */
        constructor(confusionMatrix) {
            super(confusionMatrix.getAccuracy());
            this.confusionMatrix = confusionMatrix;
        }
        /**
         * Accessor for the confusionMatrix.
         *
         * @return ConfusionMatrix.
         */
        getConfusionMatrix() {
            return this.confusionMatrix;
        }
    }
    exports.DetailedClassificationPerformance = DetailedClassificationPerformance;
});
//# sourceMappingURL=DetailedClassificationPerformance.js.map