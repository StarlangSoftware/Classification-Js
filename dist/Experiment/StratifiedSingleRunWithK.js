"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StratifiedSingleRunWithK = void 0;
const StratifiedKFoldCrossValidation_1 = require("nlptoolkit-sampling/dist/StratifiedKFoldCrossValidation");
const InstanceList_1 = require("../InstanceList/InstanceList");
class StratifiedSingleRunWithK {
    K;
    /**
     * Constructor for StratifiedSingleRunWithK class. Basically sets K parameter of the K-fold cross-validation.
     *
     * @param K K of the K-fold cross-validation.
     */
    constructor(K) {
        this.K = K;
    }
    /**
     * Execute Stratified Single K-fold cross-validation with the given classifier on the given data set using the given parameters.
     *
     * @param experiment Experiment to be run.
     * @return A Performance instance.
     */
    execute(experiment) {
        let crossValidation = new StratifiedKFoldCrossValidation_1.StratifiedKFoldCrossValidation(experiment.getDataSet().getClassInstances(), this.K, experiment.getParameter().getSeed());
        let trainSet = new InstanceList_1.InstanceList(crossValidation.getTrainFold(0));
        let testSet = new InstanceList_1.InstanceList(crossValidation.getTestFold(0));
        return experiment.getmodel().singleRun(experiment.getParameter(), trainSet, testSet);
    }
}
exports.StratifiedSingleRunWithK = StratifiedSingleRunWithK;
//# sourceMappingURL=StratifiedSingleRunWithK.js.map