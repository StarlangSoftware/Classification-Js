(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "./KFoldRunSeparateTest", "../Performance/ExperimentPerformance", "../InstanceList/Partition", "nlptoolkit-sampling/dist/StratifiedKFoldCrossValidation"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.StratifiedKFoldRunSeparateTest = void 0;
    const KFoldRunSeparateTest_1 = require("./KFoldRunSeparateTest");
    const ExperimentPerformance_1 = require("../Performance/ExperimentPerformance");
    const Partition_1 = require("../InstanceList/Partition");
    const StratifiedKFoldCrossValidation_1 = require("nlptoolkit-sampling/dist/StratifiedKFoldCrossValidation");
    class StratifiedKFoldRunSeparateTest extends KFoldRunSeparateTest_1.KFoldRunSeparateTest {
        /**
         * Constructor for StratifiedKFoldRunSeparateTest class. Basically sets K parameter of the K-fold cross-validation.
         *
         * @param K K of the K-fold cross-validation.
         */
        constructor(K) {
            super(K);
        }
        /**
         * Execute Stratified K-fold cross-validation with the given classifier on the given data set using the given parameters.
         *
         * @param experiment Experiment to be run.
         * @return An ExperimentPerformance instance.
         */
        execute(experiment) {
            let result = new ExperimentPerformance_1.ExperimentPerformance();
            let instanceList = experiment.getDataSet().getInstanceList();
            let partition = new Partition_1.Partition(instanceList, 0.25, true);
            let crossValidation = new StratifiedKFoldCrossValidation_1.StratifiedKFoldCrossValidation(new Partition_1.Partition(partition.get(1)).getLists(), this.K, experiment.getParameter().getSeed());
            this.runExperiment(experiment.getmodel(), experiment.getParameter(), result, crossValidation, partition.get(0));
            return result;
        }
    }
    exports.StratifiedKFoldRunSeparateTest = StratifiedKFoldRunSeparateTest;
});
//# sourceMappingURL=StratifiedKFoldRunSeparateTest.js.map