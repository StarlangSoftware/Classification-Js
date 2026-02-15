"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MultiLayerPerceptronModel = void 0;
const LinearPerceptronModel_1 = require("./LinearPerceptronModel");
const Matrix_1 = require("nlptoolkit-math/dist/Matrix");
const ActivationFunction_1 = require("../../Parameter/ActivationFunction");
const ClassificationPerformance_1 = require("../../Performance/ClassificationPerformance");
const Vector_1 = require("nlptoolkit-math/dist/Vector");
const Random_1 = require("nlptoolkit-util/dist/Random");
const FileContents_1 = require("nlptoolkit-util/dist/FileContents");
const Partition_1 = require("../../InstanceList/Partition");
class MultiLayerPerceptronModel extends LinearPerceptronModel_1.LinearPerceptronModel {
    V;
    activationFunction;
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
    /**
     * Training algorithm for the multilayer perceptron algorithm. 20 percent of the data is separated as cross-validation
     * data used for selecting the best weights. 80 percent of the data is used for training the multilayer perceptron with
     * gradient descent.
     *
     * @param train   Training data given to the algorithm
     * @param params Parameters of the multilayer perceptron.
     */
    train(train, params) {
        this.initialize(train);
        let parameters = params;
        let partition = new Partition_1.Partition(train, parameters.getCrossValidationRatio(), true);
        let trainSet = partition.get(1);
        let validationSet = partition.get(1);
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
     * Loads the multi-layer perceptron model from an input file.
     * @param fileName File name of the multi-layer perceptron model.
     */
    loadModel(fileName) {
        this.constructor2(fileName);
    }
}
exports.MultiLayerPerceptronModel = MultiLayerPerceptronModel;
//# sourceMappingURL=MultiLayerPerceptronModel.js.map