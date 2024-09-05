(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "./GaussianModel", "../../Attribute/DiscreteAttribute", "nlptoolkit-util/dist/FileContents", "../../InstanceList/Partition"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.NaiveBayesModel = void 0;
    const GaussianModel_1 = require("./GaussianModel");
    const DiscreteAttribute_1 = require("../../Attribute/DiscreteAttribute");
    const FileContents_1 = require("nlptoolkit-util/dist/FileContents");
    const Partition_1 = require("../../InstanceList/Partition");
    class NaiveBayesModel extends GaussianModel_1.GaussianModel {
        constructor() {
            super(...arguments);
            this.classMeans = undefined;
            this.classDeviations = undefined;
            this.classAttributeDistributions = undefined;
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
        /**
         * Training algorithm for Naive Bayes algorithm with a continuous data set.
         *
         * @param classLists        Instances are divided into K lists, where each list contains only instances from a single class
         */
        trainContinuousVersion(classLists) {
            this.classMeans = new Map();
            this.classDeviations = new Map();
            for (let i = 0; i < classLists.size(); i++) {
                let classLabel = classLists.get(i).getClassLabel();
                let averageVector = classLists.get(i).average().toVector();
                this.classMeans.set(classLabel, averageVector);
                let standardDeviationVector = classLists.get(i).standardDeviation().toVector();
                this.classDeviations.set(classLabel, standardDeviationVector);
            }
        }
        /**
         * Training algorithm for Naive Bayes algorithm with a discrete data set.
         * @param classLists Instances are divided into K lists, where each list contains only instances from a single class
         */
        trainDiscreteVersion(classLists) {
            this.classAttributeDistributions = new Map();
            for (let i = 0; i < classLists.size(); i++) {
                this.classAttributeDistributions.set(classLists.get(i).getClassLabel(), classLists.get(i).allAttributesDistribution());
            }
        }
        /**
         * Training algorithm for Naive Bayes algorithm. It basically calls trainContinuousVersion for continuous data sets,
         * trainDiscreteVersion for discrete data sets.
         * @param trainSet Training data given to the algorithm
         * @param parameters -
         */
        train(trainSet, parameters) {
            this.priorDistribution = trainSet.classDistribution();
            let classLists = new Partition_1.Partition(trainSet);
            if (classLists.get(0).get(0).getAttribute(0) instanceof DiscreteAttribute_1.DiscreteAttribute) {
                this.trainDiscreteVersion(classLists);
            }
            else {
                this.trainContinuousVersion(classLists);
            }
        }
        /**
         * Loads the naive Bayes model from an input file.
         * @param fileName File name of the naive Bayes model.
         */
        loadModel(fileName) {
            this.constructor3(fileName);
        }
    }
    exports.NaiveBayesModel = NaiveBayesModel;
});
//# sourceMappingURL=NaiveBayesModel.js.map