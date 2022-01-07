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
        constructor(K) {
            this.K = K;
        }
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