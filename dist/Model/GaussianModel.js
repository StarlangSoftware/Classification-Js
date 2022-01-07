(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "./ValidatedModel", "../Instance/CompositeInstance"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.GaussianModel = void 0;
    const ValidatedModel_1 = require("./ValidatedModel");
    const CompositeInstance_1 = require("../Instance/CompositeInstance");
    class GaussianModel extends ValidatedModel_1.ValidatedModel {
        /**
         * The predict method takes an Instance as an input. First it gets the size of prior distribution and loops this size times.
         * Then it gets the possible class labels and and calculates metric value. At the end, it returns the class which has the
         * maximum value of metric.
         *
         * @param instance {@link Instance} to predict.
         * @return The class which has the maximum value of metric.
         */
        predict(instance) {
            let maxMetric = Number.NEGATIVE_INFINITY;
            let predictedClass, size;
            if (instance instanceof CompositeInstance_1.CompositeInstance) {
                predictedClass = instance.getPossibleClassLabels()[0];
                size = instance.getPossibleClassLabels().length;
            }
            else {
                predictedClass = this.priorDistribution.getMaxItem();
                size = this.priorDistribution.size;
            }
            for (let i = 0; i < size; i++) {
                let Ci;
                if (instance instanceof CompositeInstance_1.CompositeInstance) {
                    Ci = instance.getPossibleClassLabels()[i];
                }
                else {
                    Ci = this.priorDistribution.getItem(i);
                }
                if (this.priorDistribution.containsItem(Ci)) {
                    let metric = this.calculateMetric(instance, Ci);
                    if (metric > maxMetric) {
                        maxMetric = metric;
                        predictedClass = Ci;
                    }
                }
            }
            return predictedClass;
        }
        predictProbability(instance) {
            return undefined;
        }
    }
    exports.GaussianModel = GaussianModel;
});
//# sourceMappingURL=GaussianModel.js.map