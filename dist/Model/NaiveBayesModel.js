(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "./GaussianModel", "nlptoolkit-math/dist/DiscreteDistribution", "nlptoolkit-util/dist/FileContents"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.NaiveBayesModel = void 0;
    const GaussianModel_1 = require("./GaussianModel");
    const DiscreteDistribution_1 = require("nlptoolkit-math/dist/DiscreteDistribution");
    const FileContents_1 = require("nlptoolkit-util/dist/FileContents");
    class NaiveBayesModel extends GaussianModel_1.GaussianModel {
        constructor(priorDistribution, classMeans, classDeviations) {
            super();
            this.classMeans = undefined;
            this.classDeviations = undefined;
            this.classAttributeDistributions = undefined;
            if (priorDistribution instanceof DiscreteDistribution_1.DiscreteDistribution) {
                if (classDeviations != undefined) {
                    this.constructor1(priorDistribution, classMeans, classDeviations);
                }
                else {
                    this.constructor2(priorDistribution, classMeans);
                }
            }
            else {
                this.constructor3(priorDistribution);
            }
        }
        /**
         * A constructor that sets the priorDistribution, classMeans and classDeviations.
         *
         * @param priorDistribution {@link DiscreteDistribution} input.
         * @param classMeans        A {@link Map} of String and {@link Vector}.
         * @param classDeviations   A {@link Map} of String and {@link Vector}.
         */
        constructor1(priorDistribution, classMeans, classDeviations) {
            this.priorDistribution = priorDistribution;
            this.classMeans = classMeans;
            this.classDeviations = classDeviations;
        }
        /**
         * A constructor that sets the priorDistribution and classAttributeDistributions.
         *
         * @param priorDistribution           {@link DiscreteDistribution} input.
         * @param classAttributeDistributions {@link Map} of String and {@link Array} of {@link DiscreteDistribution}s.
         */
        constructor2(priorDistribution, classAttributeDistributions) {
            this.priorDistribution = priorDistribution;
            this.classAttributeDistributions = classAttributeDistributions;
        }
        /**
         * Loads a naive Bayes model from an input model file.
         * @param fileName Model file name.
         */
        constructor3(fileName) {
            let input = new FileContents_1.FileContents(fileName);
            let size = this.loadPriorDistribution(input);
            this.classMeans = this.loadVectors(input, size);
            this.classDeviations = this.loadVectors(input, size);
        }
        /**
         * The calculateMetric method takes an {@link Instance} and a String as inputs, and it returns the log likelihood of
         * these inputs.
         *
         * @param instance {@link Instance} input.
         * @param Ci       String input.
         * @return The log likelihood of inputs.
         */
        calculateMetric(instance, Ci) {
            if (this.classAttributeDistributions == undefined) {
                return this.logLikelihoodContinuous(Ci, instance);
            }
            else {
                return this.logLikelihoodDiscrete(Ci, instance);
            }
        }
        /**
         * The logLikelihoodContinuous method takes an {@link Instance} and a class label as inputs. First it gets the logarithm
         * of given class label's probability via prior distribution as logLikelihood. Then it loops times of given instance attribute size, and accumulates the
         * logLikelihood by calculating -0.5 * ((xi - mi) / si )** 2).
         *
         * @param classLabel String input class label.
         * @param instance   {@link Instance} input.
         * @return The log likelihood of given class label and {@link Instance}.
         */
        logLikelihoodContinuous(classLabel, instance) {
            let logLikelihood = Math.log(this.priorDistribution.getProbability(classLabel));
            for (let i = 0; i < instance.attributeSize(); i++) {
                let xi = instance.getAttribute(i).getValue();
                let mi = this.classMeans.get(classLabel).getValue(i);
                let si = this.classDeviations.get(classLabel).getValue(i);
                if (si != 0) {
                    logLikelihood += -0.5 * Math.pow((xi - mi) / si, 2);
                }
            }
            return logLikelihood;
        }
        /**
         * The logLikelihoodDiscrete method takes an {@link Instance} and a class label as inputs. First it gets the logarithm
         * of given class label's probability via prior distribution as logLikelihood and gets the class attribute distribution of given class label.
         * Then it loops times of given instance attribute size, and accumulates the logLikelihood by calculating the logarithm of
         * corresponding attribute distribution's smoothed probability by using laplace smoothing on xi.
         *
         * @param classLabel String input class label.
         * @param instance   {@link Instance} input.
         * @return The log likelihood of given class label and {@link Instance}.
         */
        logLikelihoodDiscrete(classLabel, instance) {
            let logLikelihood = Math.log(this.priorDistribution.getProbability(classLabel));
            let attributeDistributions = this.classAttributeDistributions.get(classLabel);
            for (let i = 0; i < instance.attributeSize(); i++) {
                let xi = instance.getAttribute(i).getValue();
                logLikelihood += Math.log(attributeDistributions[i].getProbabilityLaplaceSmoothing(xi));
            }
            return logLikelihood;
        }
        saveTxt(fileName) {
        }
    }
    exports.NaiveBayesModel = NaiveBayesModel;
});
//# sourceMappingURL=NaiveBayesModel.js.map