(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "../Performance/ExperimentPerformance", "../InstanceList/InstanceList", "nlptoolkit-sampling/dist/KFoldCrossValidation"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.KFoldRun = void 0;
    const ExperimentPerformance_1 = require("../Performance/ExperimentPerformance");
    const InstanceList_1 = require("../InstanceList/InstanceList");
    const KFoldCrossValidation_1 = require("nlptoolkit-sampling/dist/KFoldCrossValidation");
    class KFoldRun {
        /**
         * Constructor for KFoldRun class. Basically sets K parameter of the K-fold cross-validation.
         *
         * @param K K of the K-fold cross-validation.
         */
        constructor(K) {
            this.K = K;
        }
        /**
         * Runs a K fold cross-validated experiment for the given classifier with the given parameters. The experiment
         * results will be added to the experimentPerformance.
         * @param model Model for the experiment
         * @param parameter Hyperparameters of the classifier of the experiment
         * @param experimentPerformance Storage to add experiment results
         * @param crossValidation K-fold crossvalidated dataset.
         * @throws DiscreteFeaturesNotAllowed If the classifier does not allow discrete features and the dataset contains
         * discrete features, DiscreteFeaturesNotAllowed will be thrown.
         */
        runExperiment(model, parameter, experimentPerformance, crossValidation) {
            for (let i = 0; i < this.K; i++) {
                let trainSet = new InstanceList_1.InstanceList(crossValidation.getTrainFold(i));
                let testSet = new InstanceList_1.InstanceList(crossValidation.getTestFold(i));
                model.train(trainSet, parameter);
                experimentPerformance.add(model.test(testSet));
            }
        }
        /**
         * Execute K-fold cross-validation with the given classifier on the given data set using the given parameters.
         *
         * @param experiment Experiment to be run.
         * @return An ExperimentPerformance instance.
         */
        execute(experiment) {
            let result = new ExperimentPerformance_1.ExperimentPerformance();
            let crossValidation = new KFoldCrossValidation_1.KFoldCrossValidation(experiment.getDataSet().getInstances(), this.K, experiment.getParameter().getSeed());
            this.runExperiment(experiment.getmodel(), experiment.getParameter(), result, crossValidation);
            return result;
        }
    }
    exports.KFoldRun = KFoldRun;
});
//# sourceMappingURL=KFoldRun.js.map