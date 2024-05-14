(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "./LinearPerceptronModel", "nlptoolkit-math/dist/Matrix", "../Parameter/ActivationFunction", "../InstanceList/InstanceList", "../Performance/ClassificationPerformance", "nlptoolkit-math/dist/Vector", "nlptoolkit-util/dist/Random", "nlptoolkit-util/dist/FileContents"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.MultiLayerPerceptronModel = void 0;
    const LinearPerceptronModel_1 = require("./LinearPerceptronModel");
    const Matrix_1 = require("nlptoolkit-math/dist/Matrix");
    const ActivationFunction_1 = require("../Parameter/ActivationFunction");
    const InstanceList_1 = require("../InstanceList/InstanceList");
    const ClassificationPerformance_1 = require("../Performance/ClassificationPerformance");
    const Vector_1 = require("nlptoolkit-math/dist/Vector");
    const Random_1 = require("nlptoolkit-util/dist/Random");
    const FileContents_1 = require("nlptoolkit-util/dist/FileContents");
    class MultiLayerPerceptronModel extends LinearPerceptronModel_1.LinearPerceptronModel {
        /**
         * A constructor that takes {@link InstanceList}s as trainsSet and validationSet. It  sets the {@link NeuralNetworkModel}
         * nodes with given {@link InstanceList} then creates an input vector by using given trainSet and finds error.
         * Via the validationSet it finds the classification performance and reassigns the allocated weight Matrix with the matrix
         * that has the best accuracy and the Matrix V with the best Vector input.
         *
         * @param trainSetOrFileName      InstanceList that is used to train.
         * @param validationSet InstanceList that is used to validate.
         * @param parameters    Multi layer perceptron parameters; seed, learningRate, etaDecrease, crossValidationRatio, epoch, hiddenNodes.
         */
        constructor(trainSetOrFileName, validationSet, parameters) {
            if (trainSetOrFileName instanceof InstanceList_1.InstanceList) {
                super(trainSetOrFileName);
                this.constructor1(trainSetOrFileName, validationSet, parameters);
            }
            else {
                super();
                this.constructor2(trainSetOrFileName);
            }
        }
        /**
         * The allocateWeights method allocates layers' weights of Matrix W and V.
         *
         * @param H Integer value for weights.
         * @param random Random function to set weights.
         */
        allocateWeights(H, random) {
            this.W = this.allocateLayerWeights(H, this.d + 1, random);
            this.V = this.allocateLayerWeights(this.K, H + 1, random);
        }
        /**
         * A constructor that takes {@link InstanceList}s as trainsSet and validationSet. It  sets the {@link NeuralNetworkModel}
         * nodes with given {@link InstanceList} then creates an input vector by using given trainSet and finds error.
         * Via the validationSet it finds the classification performance and reassigns the allocated weight Matrix with the matrix
         * that has the best accuracy and the Matrix V with the best Vector input.
         *
         * @param trainSet      InstanceList that is used to train.
         * @param validationSet InstanceList that is used to validate.
         * @param parameters    Multi layer perceptron parameters; seed, learningRate, etaDecrease, crossValidationRatio, epoch, hiddenNodes.
         */
        constructor1(trainSet, validationSet, parameters) {
            this.activationFunction = parameters.getActivationFunction();
            this.allocateWeights(parameters.getHiddenNodes(), new Random_1.Random(parameters.getSeed()));
            let bestW = this.W.clone();
            let bestV = this.V.clone();
            let bestClassificationPerformance = new ClassificationPerformance_1.ClassificationPerformance(0.0);
            let epoch = parameters.getEpoch();
            let learningRate = parameters.getLearningRate();
            for (let i = 0; i < epoch; i++) {
                trainSet.shuffle(new Random_1.Random(parameters.getSeed()));
                for (let j = 0; j < trainSet.size(); j++) {
                    this.createInputVector(trainSet.get(j));
                    let hidden = this.calculateHidden(this.x, this.W, this.activationFunction);
                    let hiddenBiased = hidden.biased();
                    let rMinusY = this.calculateRMinusY(trainSet.get(j), hiddenBiased, this.V);
                    let deltaV = new Matrix_1.Matrix(rMinusY, hiddenBiased);
                    let tmph = this.V.multiplyWithVectorFromLeft(rMinusY);
                    tmph.remove(0);
                    let activationDerivative;
                    switch (this.activationFunction) {
                        case ActivationFunction_1.ActivationFunction.SIGMOID:
                        default:
                            let oneMinusHidden = this.calculateOneMinusHidden(hidden);
                            activationDerivative = oneMinusHidden.elementProduct(hidden);
                            break;
                        case ActivationFunction_1.ActivationFunction.TANH:
                            let one = new Vector_1.Vector(hidden.size(), 1.0);
                            hidden.tanh();
                            activationDerivative = one.difference(hidden.elementProduct(hidden));
                            break;
                        case ActivationFunction_1.ActivationFunction.RELU:
                            hidden.reluDerivative();
                            activationDerivative = hidden;
                            break;
                    }
                    let tmpHidden = tmph.elementProduct(activationDerivative);
                    let deltaW = new Matrix_1.Matrix(tmpHidden, this.x);
                    deltaV.multiplyWithConstant(learningRate);
                    this.V.add(deltaV);
                    deltaW.multiplyWithConstant(learningRate);
                    this.W.add(deltaW);
                }
                let currentClassificationPerformance = this.testClassifier(validationSet);
                if (currentClassificationPerformance.getAccuracy() > bestClassificationPerformance.getAccuracy()) {
                    bestClassificationPerformance = currentClassificationPerformance;
                    bestW = this.W.clone();
                    bestV = this.V.clone();
                }
                learningRate *= parameters.getEtaDecrease();
            }
            this.W = bestW;
            this.V = bestV;
        }
        /**
         * Loads a multi-layer perceptron model from an input model file.
         * @param fileName Model file name.
         */
        constructor2(fileName) {
            let input = new FileContents_1.FileContents(fileName);
            this.loadClassLabels(input);
            this.W = this.loadMatrix(input);
            this.V = this.loadMatrix(input);
            this.activationFunction = this.loadActivationFunction(input);
        }
        /**
         * The calculateOutput method calculates the forward single hidden layer by using Matrices W and V.
         */
        calculateOutput() {
            this.calculateForwardSingleHiddenLayer(this.W, this.V, this.activationFunction);
        }
        saveTxt(fileName) {
        }
    }
    exports.MultiLayerPerceptronModel = MultiLayerPerceptronModel;
});
//# sourceMappingURL=MultiLayerPerceptronModel.js.map