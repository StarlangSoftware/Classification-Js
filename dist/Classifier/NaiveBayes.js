(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "./Classifier", "../InstanceList/Partition", "../Model/NaiveBayesModel", "../Attribute/DiscreteAttribute"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.NaiveBayes = void 0;
    const Classifier_1 = require("./Classifier");
    const Partition_1 = require("../InstanceList/Partition");
    const NaiveBayesModel_1 = require("../Model/NaiveBayesModel");
    const DiscreteAttribute_1 = require("../Attribute/DiscreteAttribute");
    class NaiveBayes extends Classifier_1.Classifier {
        /**
         * Training algorithm for Naive Bayes algorithm with a continuous data set.
         *
         * @param priorDistribution Probability distribution of classes P(C_i)
         * @param classLists        Instances are divided into K lists, where each list contains only instances from a single class
         */
        trainContinuousVersion(priorDistribution, classLists) {
            let classMeans = new Map();
            let classDeviations = new Map();
            for (let i = 0; i < classLists.size(); i++) {
                let classLabel = classLists.get(i).getClassLabel();
                let averageVector = classLists.get(i).average().toVector();
                classMeans.set(classLabel, averageVector);
                let standardDeviationVector = classLists.get(i).standardDeviation().toVector();
                classDeviations.set(classLabel, standardDeviationVector);
            }
            this.model = new NaiveBayesModel_1.NaiveBayesModel(priorDistribution, classMeans, classDeviations);
        }
        /**
         * Training algorithm for Naive Bayes algorithm with a discrete data set.
         * @param priorDistribution Probability distribution of classes P(C_i)
         * @param classLists Instances are divided into K lists, where each list contains only instances from a single class
         */
        trainDiscreteVersion(priorDistribution, classLists) {
            let classAttributeDistributions = new Map();
            for (let i = 0; i < classLists.size(); i++) {
                classAttributeDistributions.set(classLists.get(i).getClassLabel(), classLists.get(i).allAttributesDistribution());
            }
            this.model = new NaiveBayesModel_1.NaiveBayesModel(priorDistribution, classAttributeDistributions);
        }
        /**
         * Training algorithm for Naive Bayes algorithm. It basically calls trainContinuousVersion for continuous data sets,
         * trainDiscreteVersion for discrete data sets.
         * @param trainSet Training data given to the algorithm
         * @param parameters -
         */
        train(trainSet, parameters) {
            let priorDistribution = trainSet.classDistribution();
            let classLists = new Partition_1.Partition(trainSet);
            if (classLists.get(0).get(0).getAttribute(0) instanceof DiscreteAttribute_1.DiscreteAttribute) {
                this.trainDiscreteVersion(priorDistribution, classLists);
            }
            else {
                this.trainContinuousVersion(priorDistribution, classLists);
            }
        }
        loadModel(fileName) {
            this.model = new NaiveBayesModel_1.NaiveBayesModel(fileName);
        }
    }
    exports.NaiveBayes = NaiveBayes;
});
//# sourceMappingURL=NaiveBayes.js.map