"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MxKFoldRunSeparateTest = void 0;
const KFoldRunSeparateTest_1 = require("./KFoldRunSeparateTest");
const ExperimentPerformance_1 = require("../Performance/ExperimentPerformance");
const Partition_1 = require("../InstanceList/Partition");
const KFoldCrossValidation_1 = require("nlptoolkit-sampling/dist/KFoldCrossValidation");
class MxKFoldRunSeparateTest extends KFoldRunSeparateTest_1.KFoldRunSeparateTest {
    M;
    /**
     * Constructor for KFoldRunSeparateTest class. Basically sets K parameter of the K-fold cross-validation and M for
     * the number of times.
     *
     * @param M number of cross-validation times.
     * @param K K of the K-fold cross-validation.
     */
    constructor(M, K) {
        super(K);
        this.M = M;
    }
    /**
     * Execute the MxKFold run with separate test set with the given classifier on the given data set using the given parameters.
     *
     * @param experiment Experiment to be run.
     * @return An ExperimentPerformance instance.
     */
    execute(experiment) {
        let result = new ExperimentPerformance_1.ExperimentPerformance();
        let instanceList = experiment.getDataSet().getInstanceList();
        let partition = new Partition_1.Partition(instanceList, 0.25, true);
        for (let j = 0; j < this.M; j++) {
            let crossValidation = new KFoldCrossValidation_1.KFoldCrossValidation(partition.get(1).getInstances(), this.K, experiment.getParameter().getSeed());
            this.runExperiment(experiment.getmodel(), experiment.getParameter(), result, crossValidation, partition.get(0));
        }
        return result;
    }
}
exports.MxKFoldRunSeparateTest = MxKFoldRunSeparateTest;
//# sourceMappingURL=MxKFoldRunSeparateTest.js.map