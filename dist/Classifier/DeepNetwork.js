(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "./Classifier", "../InstanceList/Partition", "../Model/DeepNetworkModel"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.DeepNetwork = void 0;
    const Classifier_1 = require("./Classifier");
    const Partition_1 = require("../InstanceList/Partition");
    const DeepNetworkModel_1 = require("../Model/DeepNetworkModel");
    class DeepNetwork extends Classifier_1.Classifier {
        /**
         * Training algorithm for deep network classifier.
         *
         * @param trainSet   Training data given to the algorithm.
         * @param parameters Parameters of the deep network algorithm. crossValidationRatio and seed are used as parameters.
         * @throws DiscreteFeaturesNotAllowed Exception for discrete features.
         */
        train(trainSet, parameters) {
            let partition = new Partition_1.Partition(trainSet, parameters.getCrossValidationRatio(), true);
            this.model = new DeepNetworkModel_1.DeepNetworkModel(partition.get(1), partition.get(0), parameters);
        }
        /**
         * Loads the deep network model from an input file.
         * @param fileName File name of the deep network model.
         */
        loadModel(fileName) {
            this.model = new DeepNetworkModel_1.DeepNetworkModel(fileName);
        }
    }
    exports.DeepNetwork = DeepNetwork;
});
//# sourceMappingURL=DeepNetwork.js.map