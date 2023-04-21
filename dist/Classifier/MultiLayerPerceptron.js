(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "./Classifier", "../InstanceList/Partition", "../Model/MultiLayerPerceptronModel"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.MultiLayerPerceptron = void 0;
    const Classifier_1 = require("./Classifier");
    const Partition_1 = require("../InstanceList/Partition");
    const MultiLayerPerceptronModel_1 = require("../Model/MultiLayerPerceptronModel");
    class MultiLayerPerceptron extends Classifier_1.Classifier {
        /**
         * Training algorithm for the multilayer perceptron algorithm. 20 percent of the data is separated as cross-validation
         * data used for selecting the best weights. 80 percent of the data is used for training the multilayer perceptron with
         * gradient descent.
         *
         * @param trainSet   Training data given to the algorithm
         * @param parameters Parameters of the multilayer perceptron.
         */
        train(trainSet, parameters) {
            let partition = new Partition_1.Partition(trainSet, parameters.getCrossValidationRatio(), true);
            this.model = new MultiLayerPerceptronModel_1.MultiLayerPerceptronModel(partition.get(1), partition.get(0), parameters);
        }
        loadModel(fileName) {
            this.model = new MultiLayerPerceptronModel_1.MultiLayerPerceptronModel(fileName);
        }
    }
    exports.MultiLayerPerceptron = MultiLayerPerceptron;
});
//# sourceMappingURL=MultiLayerPerceptron.js.map