(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "./NeuralNetworkModel", "nlptoolkit-math/dist/Matrix", "../Performance/ClassificationPerformance"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.LinearPerceptronModel = void 0;
    const NeuralNetworkModel_1 = require("./NeuralNetworkModel");
    const Matrix_1 = require("nlptoolkit-math/dist/Matrix");
    const ClassificationPerformance_1 = require("../Performance/ClassificationPerformance");
    class LinearPerceptronModel extends NeuralNetworkModel_1.NeuralNetworkModel {
        /**
         * Constructor that takes {@link InstanceList}s as trainsSet and validationSet. Initially it allocates layer weights,
         * then creates an input vector by using given trainSet and finds error. Via the validationSet it finds the classification
         * performance and at the end it reassigns the allocated weight Matrix with the matrix that has the best accuracy.
         *
         * @param trainSet      InstanceList that is used to train.
         * @param validationSet InstanceList that is used to validate.
         * @param parameters    Linear perceptron parameters; learningRate, etaDecrease, crossValidationRatio, epoch.
         */
        constructor(trainSet, validationSet, parameters) {
            super(trainSet);
            if (validationSet != undefined) {
                let W = this.allocateLayerWeights(this.K, this.d + 1);
                let bestW = W.clone();
                let bestClassificationPerformance = new ClassificationPerformance_1.ClassificationPerformance(0.0);
                let epoch = parameters.getEpoch();
                let learningRate = parameters.getLearningRate();
                for (let i = 0; i < epoch; i++) {
                    trainSet.shuffle(parameters.getSeed());
                    for (let j = 0; j < trainSet.size(); j++) {
                        this.createInputVector(trainSet.get(j));
                        let rMinusY = this.calculateRMinusY(trainSet.get(j), this.x, W);
                        let deltaW = new Matrix_1.Matrix(rMinusY, this.x);
                        deltaW.multiplyWithConstant(learningRate);
                        W.add(deltaW);
                    }
                    let currentClassificationPerformance = this.testClassifier(validationSet);
                    if (currentClassificationPerformance.getAccuracy() > bestClassificationPerformance.getAccuracy()) {
                        bestClassificationPerformance = currentClassificationPerformance;
                        bestW = W.clone();
                    }
                    learningRate *= parameters.getEtaDecrease();
                }
                W = bestW;
            }
        }
        /**
         * The calculateOutput method calculates the {@link Matrix} y by multiplying Matrix W with {@link Vector} x.
         */
        calculateOutput() {
            this.y = this.W.multiplyWithVectorFromRight(this.x);
        }
    }
    exports.LinearPerceptronModel = LinearPerceptronModel;
});
//# sourceMappingURL=LinearPerceptronModel.js.map