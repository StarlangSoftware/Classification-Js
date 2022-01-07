(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "./KFoldRun", "../Performance/ExperimentPerformance", "nlptoolkit-sampling/dist/StratifiedKFoldCrossValidation"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.StratifiedKFoldRun = void 0;
    const KFoldRun_1 = require("./KFoldRun");
    const ExperimentPerformance_1 = require("../Performance/ExperimentPerformance");
    const StratifiedKFoldCrossValidation_1 = require("nlptoolkit-sampling/dist/StratifiedKFoldCrossValidation");
    class StratifiedKFoldRun extends KFoldRun_1.KFoldRun {
        /**
         * Constructor for KFoldRun class. Basically sets K parameter of the K-fold cross-validation.
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
            let crossValidation = new StratifiedKFoldCrossValidation_1.StratifiedKFoldCrossValidation(experiment.getDataSet().getClassInstances(), this.K, experiment.getParameter().getSeed());
            this.runExperiment(experiment.getClassifier(), experiment.getParameter(), result, crossValidation);
            return result;
        }
    }
    exports.StratifiedKFoldRun = StratifiedKFoldRun;
});
//# sourceMappingURL=StratifiedKFoldRun.js.map