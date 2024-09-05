(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "./StratifiedKFoldRunSeparateTest", "../Performance/ExperimentPerformance", "../InstanceList/Partition", "nlptoolkit-sampling/dist/StratifiedKFoldCrossValidation"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.StratifiedMxKFoldRunSeparateTest = void 0;
    const StratifiedKFoldRunSeparateTest_1 = require("./StratifiedKFoldRunSeparateTest");
    const ExperimentPerformance_1 = require("../Performance/ExperimentPerformance");
    const Partition_1 = require("../InstanceList/Partition");
    const StratifiedKFoldCrossValidation_1 = require("nlptoolkit-sampling/dist/StratifiedKFoldCrossValidation");
    class StratifiedMxKFoldRunSeparateTest extends StratifiedKFoldRunSeparateTest_1.StratifiedKFoldRunSeparateTest {
        /**
         * Constructor for StratifiedMxKFoldRunSeparateTest class. Basically sets K parameter of the K-fold cross-validation and M for the number of times.
         *
         * @param M number of cross-validation times.
         * @param K K of the K-fold cross-validation.
         */
        constructor(M, K) {
            super(K);
            this.M = M;
        }
        /**
         * Execute the Stratified MxK-fold cross-validation with the given classifier on the given data set using the given parameters.
         *
         * @param experiment Experiment to be run.
         * @return An ExperimentPerformance instance.
         */
        execute(experiment) {
            let result = new ExperimentPerformance_1.ExperimentPerformance();
            let instanceList = experiment.getDataSet().getInstanceList();
            let partition = new Partition_1.Partition(instanceList, 0.25, true);
            for (let j = 0; j < this.M; j++) {
                let crossValidation = new StratifiedKFoldCrossValidation_1.StratifiedKFoldCrossValidation(new Partition_1.Partition(partition.get(1)).getLists(), this.K, experiment.getParameter().getSeed());
                this.runExperiment(experiment.getmodel(), experiment.getParameter(), result, crossValidation, partition.get(0));
            }
            return result;
        }
    }
    exports.StratifiedMxKFoldRunSeparateTest = StratifiedMxKFoldRunSeparateTest;
});
//# sourceMappingURL=StratifiedMxKFoldRunSeparateTest.js.map