(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "nlptoolkit-math/dist/DiscreteDistribution", "./ValidatedModel", "../Instance/CompositeInstance", "nlptoolkit-math/dist/Vector"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.GaussianModel = void 0;
    const DiscreteDistribution_1 = require("nlptoolkit-math/dist/DiscreteDistribution");
    const ValidatedModel_1 = require("./ValidatedModel");
    const CompositeInstance_1 = require("../Instance/CompositeInstance");
    const Vector_1 = require("nlptoolkit-math/dist/Vector");
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
        /**
         * Loads the prior probability distribution from an input model file.
         * @param input Input model file.
         * @return Prior probability distribution.
         * @throws IOException If the input file can not be read, the method throws IOException.
         */
        loadPriorDistribution(input) {
            let size = parseInt(input.readLine());
            this.priorDistribution = new DiscreteDistribution_1.DiscreteDistribution();
            for (let i = 0; i < size; i++) {
                let line = input.readLine();
                let items = line.split(" ");
                for (let j = 0; j < parseInt(items[1]); j++) {
                    this.priorDistribution.addItem(items[0]);
                }
            }
            return size;
        }
        /**
         * Loads hash map of vectors from input model file.
         * @param input Input model file.
         * @param size Number of vectors to be read from input model file.
         * @return Hash map of vectors.
         * @throws IOException If the input file can not be read, the method throws IOException.
         */
        loadVectors(input, size) {
            let map = new Map();
            for (let i = 0; i < size; i++) {
                let line = input.readLine();
                let items = line.split(" ");
                let vector = new Vector_1.Vector(parseInt(items[1]), 0);
                for (let j = 2; j < items.length; j++) {
                    vector.setValue(j - 2, parseFloat(items[j]));
                }
                map.set(items[0], vector);
            }
            return map;
        }
        /**
         * Calculates the posterior probability distribution for the given instance according to Gaussian model.
         * @param instance Instance for which posterior probability distribution is calculated.
         * @return Posterior probability distribution for the given instance.
         */
        predictProbability(instance) {
            return undefined;
        }
    }
    exports.GaussianModel = GaussianModel;
});
//# sourceMappingURL=GaussianModel.js.map