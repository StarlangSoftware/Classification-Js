(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "./NeuralNetworkModel", "nlptoolkit-math/dist/Matrix", "../../Performance/ClassificationPerformance", "nlptoolkit-util/dist/Random", "nlptoolkit-util/dist/FileContents", "../../InstanceList/Partition"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.LinearPerceptronModel = void 0;
    const NeuralNetworkModel_1 = require("./NeuralNetworkModel");
    const Matrix_1 = require("nlptoolkit-math/dist/Matrix");
    const ClassificationPerformance_1 = require("../../Performance/ClassificationPerformance");
    const Random_1 = require("nlptoolkit-util/dist/Random");
    const FileContents_1 = require("nlptoolkit-util/dist/FileContents");
    const Partition_1 = require("../../InstanceList/Partition");
    class LinearPerceptronModel extends NeuralNetworkModel_1.NeuralNetworkModel {
        /**
         * Loads a linear perceptron model from an input model file.
         * @param fileName Model file name.
         */
        constructor2(fileName) {
            let input = new FileContents_1.FileContents(fileName);
            this.loadClassLabels(input);
            this.W = this.loadMatrix(input);
        }
        /**
         * The calculateOutput method calculates the {@link Matrix} y by multiplying Matrix W with {@link Vector} x.
         */
        calculateOutput() {
            this.y = this.W.multiplyWithVectorFromRight(this.x);
        }
        saveTxt(fileName) {
        }
        /**
         * Training algorithm for the linear perceptron algorithm. 20 percent of the data is separated as cross-validation
         * data used for selecting the best weights. 80 percent of the data is used for training the linear perceptron with
         * gradient descent.
         *
         * @param train   Training data given to the algorithm
         * @param params Parameters of the linear perceptron.
         */
        train(train, params) {
            this.initialize(train);
            let parameters = params;
            let partition = new Partition_1.Partition(train, parameters.getCrossValidationRatio(), true);
            let trainSet = partition.get(1);
            let validationSet = partition.get(0);
            this.W = this.allocateLayerWeights(this.K, this.d + 1, new Random_1.Random(parameters.getSeed()));
            let bestW = this.W.clone();
            let bestClassificationPerformance = new ClassificationPerformance_1.ClassificationPerformance(0.0);
            let epoch = parameters.getEpoch();
            let learningRate = parameters.getLearningRate();
            for (let i = 0; i < epoch; i++) {
                trainSet.shuffle(new Random_1.Random(parameters.getSeed()));
                for (let j = 0; j < trainSet.size(); j++) {
                    this.createInputVector(trainSet.get(j));
                    let rMinusY = this.calculateRMinusY(trainSet.get(j), this.x, this.W);
                    let deltaW = new Matrix_1.Matrix(rMinusY, this.x);
                    deltaW.multiplyWithConstant(learningRate);
                    this.W.add(deltaW);
                }
                let currentClassificationPerformance = this.testClassifier(validationSet);
                if (currentClassificationPerformance.getAccuracy() > bestClassificationPerformance.getAccuracy()) {
                    bestClassificationPerformance = currentClassificationPerformance;
                    bestW = this.W.clone();
                }
                learningRate *= parameters.getEtaDecrease();
            }
            this.W = bestW;
        }
        /**
         * Loads the linear perceptron model from an input file.
         * @param fileName File name of the linear perceptron model.
         */
        loadModel(fileName) {
            this.constructor2(fileName);
        }
    }
    exports.LinearPerceptronModel = LinearPerceptronModel;
});
//# sourceMappingURL=LinearPerceptronModel.js.map