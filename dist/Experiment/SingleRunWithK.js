(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "nlptoolkit-sampling/dist/KFoldCrossValidation", "../InstanceList/InstanceList"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.SingleRunWithK = void 0;
    const KFoldCrossValidation_1 = require("nlptoolkit-sampling/dist/KFoldCrossValidation");
    const InstanceList_1 = require("../InstanceList/InstanceList");
    class SingleRunWithK {
        /**
         * Constructor for SingleRunWithK class. Basically sets K parameter of the K-fold cross-validation.
         *
         * @param K K of the K-fold cross-validation.
         */
        constructor(K) {
            this.K = K;
        }
        /**
         * Runs first fold of a K fold cross-validated experiment for the given classifier with the given parameters.
         * The experiment result will be returned.
         * @param classifier Classifier for the experiment
         * @param parameter Hyperparameters of the classifier of the experiment
         * @param crossValidation K-fold crossvalidated dataset.
         * @return The experiment result of the first fold of the K-fold cross-validated experiment.
         * @throws DiscreteFeaturesNotAllowed If the classifier does not allow discrete features and the dataset contains
         * discrete features, DiscreteFeaturesNotAllowed will be thrown.
         */
        runExperiment(classifier, parameter, crossValidation) {
            let trainSet = new InstanceList_1.InstanceList(crossValidation.getTrainFold(0));
            let testSet = new InstanceList_1.InstanceList(crossValidation.getTestFold(0));
            return classifier.singleRun(parameter, trainSet, testSet);
        }
        /**
         * Execute Single K-fold cross-validation with the given classifier on the given data set using the given parameters.
         *
         * @param experiment Experiment to be run.
         * @return A Performance instance
         */
        execute(experiment) {
            let crossValidation = new KFoldCrossValidation_1.KFoldCrossValidation(experiment.getDataSet().getInstances(), this.K, experiment.getParameter().getSeed());
            return this.runExperiment(experiment.getClassifier(), experiment.getParameter(), crossValidation);
        }
    }
    exports.SingleRunWithK = SingleRunWithK;
});
//# sourceMappingURL=SingleRunWithK.js.map