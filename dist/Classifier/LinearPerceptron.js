(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "./Classifier", "../InstanceList/Partition", "../Model/LinearPerceptronModel"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.LinearPerceptron = void 0;
    const Classifier_1 = require("./Classifier");
    const Partition_1 = require("../InstanceList/Partition");
    const LinearPerceptronModel_1 = require("../Model/LinearPerceptronModel");
    class LinearPerceptron extends Classifier_1.Classifier {
        /**
         * Training algorithm for the linear perceptron algorithm. 20 percent of the data is separated as cross-validation
         * data used for selecting the best weights. 80 percent of the data is used for training the linear perceptron with
         * gradient descent.
         *
         * @param trainSet   Training data given to the algorithm
         * @param parameters Parameters of the linear perceptron.
         */
        train(trainSet, parameters) {
            let partition = new Partition_1.Partition(trainSet, parameters.getCrossValidationRatio(), true);
            this.model = new LinearPerceptronModel_1.LinearPerceptronModel(partition.get(1), partition.get(0), parameters);
        }
    }
    exports.LinearPerceptron = LinearPerceptron;
});
//# sourceMappingURL=LinearPerceptron.js.map