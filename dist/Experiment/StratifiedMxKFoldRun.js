(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "./MxKFoldRun", "../Performance/ExperimentPerformance", "nlptoolkit-sampling/dist/StratifiedKFoldCrossValidation"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.StratifiedMxKFoldRun = void 0;
    const MxKFoldRun_1 = require("./MxKFoldRun");
    const ExperimentPerformance_1 = require("../Performance/ExperimentPerformance");
    const StratifiedKFoldCrossValidation_1 = require("nlptoolkit-sampling/dist/StratifiedKFoldCrossValidation");
    class StratifiedMxKFoldRun extends MxKFoldRun_1.MxKFoldRun {
        /**
         * Constructor for StratifiedMxKFoldRun class. Basically sets K parameter of the K-fold cross-validation and M for the number of times.
         *
         * @param M number of cross-validation times.
         * @param K K of the K-fold cross-validation.
         */
        constructor(M, K) {
            super(M, K);
        }
        /**
         * Execute the Stratified MxK-fold cross-validation with the given classifier on the given data set using the given parameters.
         *
         * @param experiment Experiment to be run.
         * @return An ExperimentPerformance instance.
         */
        execute(experiment) {
            let result = new ExperimentPerformance_1.ExperimentPerformance();
            for (let j = 0; j < this.M; j++) {
                let crossValidation = new StratifiedKFoldCrossValidation_1.StratifiedKFoldCrossValidation(experiment.getDataSet().getClassInstances(), this.K, experiment.getParameter().getSeed());
                this.runExperiment(experiment.getmodel(), experiment.getParameter(), result, crossValidation);
            }
            return result;
        }
    }
    exports.StratifiedMxKFoldRun = StratifiedMxKFoldRun;
});
//# sourceMappingURL=StratifiedMxKFoldRun.js.map