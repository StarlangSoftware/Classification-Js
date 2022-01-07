(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "../Attribute/DiscreteAttribute", "../Attribute/DiscreteIndexedAttribute", "../Performance/ConfusionMatrix", "../Performance/DetailedClassificationPerformance"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Classifier = void 0;
    const DiscreteAttribute_1 = require("../Attribute/DiscreteAttribute");
    const DiscreteIndexedAttribute_1 = require("../Attribute/DiscreteIndexedAttribute");
    const ConfusionMatrix_1 = require("../Performance/ConfusionMatrix");
    const DetailedClassificationPerformance_1 = require("../Performance/DetailedClassificationPerformance");
    class Classifier {
        /**
         * Checks given instance's attribute and returns true if it is a discrete indexed attribute, false otherwise.
         *
         * @param instance Instance to check.
         * @return True if instance is a discrete indexed attribute, false otherwise.
         */
        discreteCheck(instance) {
            for (let i = 0; i < instance.attributeSize(); i++) {
                if (instance.getAttribute(i) instanceof DiscreteAttribute_1.DiscreteAttribute &&
                    !(instance.getAttribute(i) instanceof DiscreteIndexedAttribute_1.DiscreteIndexedAttribute)) {
                    return false;
                }
            }
            return true;
        }
        /**
         * TestClassification an instance list with the current model.
         *
         * @param testSet Test data (list of instances) to be tested.
         * @return The accuracy (and error) of the model as an instance of Performance class.
         */
        test(testSet) {
            let classLabels = testSet.getUnionOfPossibleClassLabels();
            let confusion = new ConfusionMatrix_1.ConfusionMatrix(classLabels);
            for (let i = 0; i < testSet.size(); i++) {
                let instance = testSet.get(i);
                confusion.classify(instance.getClassLabel(), this.model.predict(instance));
            }
            return new DetailedClassificationPerformance_1.DetailedClassificationPerformance(confusion);
        }
        /**
         * Runs current classifier with the given train and test data.
         *
         * @param parameter Parameter of the classifier to be trained.
         * @param trainSet  Training data to be used in training the classifier.
         * @param testSet   Test data to be tested after training the model.
         * @return The accuracy (and error) of the trained model as an instance of Performance class.
         * @throws DiscreteFeaturesNotAllowed Exception for discrete features.
         */
        singleRun(parameter, trainSet, testSet) {
            this.train(trainSet, parameter);
            return this.test(testSet);
        }
        /**
         * Accessor for the model.
         *
         * @return Model.
         */
        getModel() {
            return this.model;
        }
    }
    exports.Classifier = Classifier;
});
//# sourceMappingURL=Classifier.js.map