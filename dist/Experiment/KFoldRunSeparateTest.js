(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "./KFoldRun", "../Performance/ExperimentPerformance", "../InstanceList/InstanceList", "nlptoolkit-sampling/dist/KFoldCrossValidation", "../InstanceList/Partition"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.KFoldRunSeparateTest = void 0;
    const KFoldRun_1 = require("./KFoldRun");
    const ExperimentPerformance_1 = require("../Performance/ExperimentPerformance");
    const InstanceList_1 = require("../InstanceList/InstanceList");
    const KFoldCrossValidation_1 = require("nlptoolkit-sampling/dist/KFoldCrossValidation");
    const Partition_1 = require("../InstanceList/Partition");
    class KFoldRunSeparateTest extends KFoldRun_1.KFoldRun {
        /**
         * Constructor for KFoldRunSeparateTest class. Basically sets K parameter of the K-fold cross-validation.
         *
         * @param K K of the K-fold cross-validation.
         */
        constructor(K) {
            super(K);
        }
        /**
         * Runs a K fold cross-validated experiment for the given classifier with the given parameters. Testing will be
         * done on the separate test set. The experiment results will be added to the experimentPerformance.
         * @param model Model for the experiment
         * @param parameter Hyperparameters of the classifier of the experiment
         * @param experimentPerformance Storage to add experiment results
         * @param crossValidation K-fold crossvalidated dataset.
         * @param testSet Test set on which experiment performance is calculated.
         * @throws DiscreteFeaturesNotAllowed If the classifier does not allow discrete features and the dataset contains
         * discrete features, DiscreteFeaturesNotAllowed will be thrown.
         */
        runExperiment(model, parameter, experimentPerformance, crossValidation, testSet) {
            for (let i = 0; i < this.K; i++) {
                let trainSet = new InstanceList_1.InstanceList(crossValidation.getTrainFold(i));
                model.train(trainSet, parameter);
                experimentPerformance.add(model.test(testSet));
            }
        }
        /**
         * Execute K-fold cross-validation with separate test set with the given classifier on the given data set using the given parameters.
         *
         * @param experiment Experiment to be run.
         * @return An ExperimentPerformance instance.
         */
        execute(experiment) {
            let result = new ExperimentPerformance_1.ExperimentPerformance();
            let instanceList = experiment.getDataSet().getInstanceList();
            let partition = new Partition_1.Partition(instanceList, 0.25, true);
            let crossValidation = new KFoldCrossValidation_1.KFoldCrossValidation(partition.get(1).getInstances(), this.K, experiment.getParameter().getSeed());
            this.runExperiment(experiment.getmodel(), experiment.getParameter(), result, crossValidation, partition.get(0));
            return result;
        }
    }
    exports.KFoldRunSeparateTest = KFoldRunSeparateTest;
});
//# sourceMappingURL=KFoldRunSeparateTest.js.map