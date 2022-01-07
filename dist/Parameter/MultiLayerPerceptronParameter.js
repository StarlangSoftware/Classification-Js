(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "./LinearPerceptronParameter"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.MultiLayerPerceptronParameter = void 0;
    const LinearPerceptronParameter_1 = require("./LinearPerceptronParameter");
    class MultiLayerPerceptronParameter extends LinearPerceptronParameter_1.LinearPerceptronParameter {
        /**
         * Parameters of the multi layer perceptron algorithm.
         *
         * @param seed                 Seed is used for random number generation.
         * @param learningRate         Double value for learning rate of the algorithm.
         * @param etaDecrease          Double value for decrease in eta of the algorithm.
         * @param crossValidationRatio Double value for cross validation ratio of the algorithm.
         * @param epoch                Integer value for epoch number of the algorithm.
         * @param hiddenNodes          Integer value for the number of hidden nodes.
         * @param activationFunction   Activation function
         */
        constructor(seed, learningRate, etaDecrease, crossValidationRatio, epoch, hiddenNodes, activationFunction) {
            super(seed, learningRate, etaDecrease, crossValidationRatio, epoch);
            this.hiddenNodes = hiddenNodes;
            this.activationFunction = activationFunction;
        }
        /**
         * Accessor for the hiddenNodes.
         *
         * @return The hiddenNodes.
         */
        getHiddenNodes() {
            return this.hiddenNodes;
        }
        /**
         * Accessor for the activation function.
         *
         * @return The activation function.
         */
        getActivationFunction() {
            return this.activationFunction;
        }
    }
    exports.MultiLayerPerceptronParameter = MultiLayerPerceptronParameter;
});
//# sourceMappingURL=MultiLayerPerceptronParameter.js.map