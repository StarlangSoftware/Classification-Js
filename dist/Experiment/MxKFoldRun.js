"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MxKFoldRun = void 0;
const KFoldRun_1 = require("./KFoldRun");
const ExperimentPerformance_1 = require("../Performance/ExperimentPerformance");
const KFoldCrossValidation_1 = require("nlptoolkit-sampling/dist/KFoldCrossValidation");
class MxKFoldRun extends KFoldRun_1.KFoldRun {
    M;
    /**
     * Constructor for MxKFoldRun class. Basically sets K parameter of the K-fold cross-validation and M for the number of times.
     *
     * @param M number of cross-validation times.
     * @param K K of the K-fold cross-validation.
     */
    constructor(M, K) {
        super(K);
        this.M = M;
    }
    /**
     * Execute the MxKFold run with the given classifier on the given data set using the given parameters.
     *
     * @param experiment Experiment to be run.
     * @return An ExperimentPerformance instance.
     */
    execute(experiment) {
        let result = new ExperimentPerformance_1.ExperimentPerformance();
        for (let j = 0; j < this.M; j++) {
            let crossValidation = new KFoldCrossValidation_1.KFoldCrossValidation(experiment.getDataSet().getInstances(), this.K, experiment.getParameter().getSeed());
            this.runExperiment(experiment.getmodel(), experiment.getParameter(), result, crossValidation);
        }
        return result;
    }
}
exports.MxKFoldRun = MxKFoldRun;
//# sourceMappingURL=MxKFoldRun.js.map