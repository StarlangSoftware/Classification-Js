(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "../Performance/ExperimentPerformance", "nlptoolkit-sampling/dist/Bootstrap", "../InstanceList/InstanceList"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.BootstrapRun = void 0;
    const ExperimentPerformance_1 = require("../Performance/ExperimentPerformance");
    const Bootstrap_1 = require("nlptoolkit-sampling/dist/Bootstrap");
    const InstanceList_1 = require("../InstanceList/InstanceList");
    class BootstrapRun {
        /**
         * Constructor for BootstrapRun class. Basically sets the number of bootstrap runs.
         *
         * @param numberOfBootstraps Number of bootstrap runs.
         */
        constructor(numberOfBootstraps) {
            this.numberOfBootstraps = numberOfBootstraps;
        }
        /**
         * Execute the bootstrap run with the given classifier on the given data set using the given parameters.
         *
         * @param experiment Experiment to be run.
         * @return An ExperimentPerformance instance.
         */
        execute(experiment) {
            let result = new ExperimentPerformance_1.ExperimentPerformance();
            for (let i = 0; i < this.numberOfBootstraps; i++) {
                let bootstrap = new Bootstrap_1.Bootstrap(experiment.getDataSet().getInstances(), i + experiment.getParameter().getSeed());
                let bootstrapSample = new InstanceList_1.InstanceList(bootstrap.getSample());
                experiment.getClassifier().train(bootstrapSample, experiment.getParameter());
                result.add(experiment.getClassifier().test(experiment.getDataSet().getInstanceList()));
            }
            return result;
        }
    }
    exports.BootstrapRun = BootstrapRun;
});
//# sourceMappingURL=BootstrapRun.js.map