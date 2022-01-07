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
    exports.DeepNetworkParameter = void 0;
    const LinearPerceptronParameter_1 = require("./LinearPerceptronParameter");
    class DeepNetworkParameter extends LinearPerceptronParameter_1.LinearPerceptronParameter {
        /**
         * Parameters of the deep network classifier.
         *
         * @param seed                 Seed is used for random number generation.
         * @param learningRate         Double value for learning rate of the algorithm.
         * @param etaDecrease          Double value for decrease in eta of the algorithm.
         * @param crossValidationRatio Double value for cross validation ratio of the algorithm.
         * @param epoch                Integer value for epoch number of the algorithm.
         * @param hiddenLayers         An integer {@link Array} for hidden layers of the algorithm.
         * @param activationFunction   Activation function
         */
        constructor(seed, learningRate, etaDecrease, crossValidationRatio, epoch, hiddenLayers, activationFunction) {
            super(seed, learningRate, etaDecrease, crossValidationRatio, epoch);
            this.hiddenLayers = hiddenLayers;
            this.activationFunction = activationFunction;
        }
        /**
         * The layerSize method returns the size of the hiddenLayers {@link Array}.
         *
         * @return The size of the hiddenLayers {@link Array}.
         */
        layerSize() {
            return this.hiddenLayers.length;
        }
        /**
         * The getHiddenNodes method takes a layer index as an input and returns the element at the given index of hiddenLayers
         * {@link Array}.
         *
         * @param layerIndex Index of the layer.
         * @return The element at the layerIndex of hiddenLayers {@link Array}.
         */
        getHiddenNodes(layerIndex) {
            return this.hiddenLayers[layerIndex];
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
    exports.DeepNetworkParameter = DeepNetworkParameter;
});
//# sourceMappingURL=DeepNetworkParameter.js.map