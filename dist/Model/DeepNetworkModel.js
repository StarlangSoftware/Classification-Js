(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "./NeuralNetworkModel", "nlptoolkit-math/dist/Matrix", "../Parameter/ActivationFunction", "../InstanceList/InstanceList", "nlptoolkit-math/dist/Vector", "../Performance/ClassificationPerformance", "nlptoolkit-util/dist/Random", "nlptoolkit-util/dist/FileContents"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.DeepNetworkModel = void 0;
    const NeuralNetworkModel_1 = require("./NeuralNetworkModel");
    const Matrix_1 = require("nlptoolkit-math/dist/Matrix");
    const ActivationFunction_1 = require("../Parameter/ActivationFunction");
    const InstanceList_1 = require("../InstanceList/InstanceList");
    const Vector_1 = require("nlptoolkit-math/dist/Vector");
    const ClassificationPerformance_1 = require("../Performance/ClassificationPerformance");
    const Random_1 = require("nlptoolkit-util/dist/Random");
    const FileContents_1 = require("nlptoolkit-util/dist/FileContents");
    class DeepNetworkModel extends NeuralNetworkModel_1.NeuralNetworkModel {
        /**
         * Constructor that takes two {@link InstanceList} train set and validation set and {@link DeepNetworkParameter} as inputs.
         * First it sets the class labels, their sizes as K and the size of the continuous attributes as d of given train set and
         * allocates weights and sets the best weights. At each epoch, it shuffles the train set and loops through the each item of that train set,
         * it multiplies the weights Matrix with input Vector than applies the sigmoid function and stores the result as hidden and add bias.
         * Then updates weights and at the end it compares the performance of these weights with validation set. It updates the bestClassificationPerformance and
         * bestWeights according to the current situation. At the end it updates the learning rate via etaDecrease value and finishes
         * with clearing the weights.
         *
         * @param trainSetOrFileName      {@link InstanceList} to be used as trainSet.
         * @param validationSet {@link InstanceList} to be used as validationSet.
         * @param parameters    {@link DeepNetworkParameter} input.
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
         * The allocateWeights method takes {@link DeepNetworkParameter}s as an input. First it adds random weights to the {@link Array}
         * of {@link Matrix} weights' first layer. Then it loops through the layers and adds random weights till the last layer.
         * At the end it adds random weights to the last layer and also sets the hiddenLayerSize value.
         *
         * @param parameters {@link DeepNetworkParameter} input.
         */
        allocateWeights(parameters) {
            this.weights = new Array();
            this.weights.push(this.allocateLayerWeights(parameters.getHiddenNodes(0), this.d + 1, new Random_1.Random(parameters.getSeed())));
            for (let i = 0; i < parameters.layerSize() - 1; i++) {
                this.weights.push(this.allocateLayerWeights(parameters.getHiddenNodes(i + 1), parameters.getHiddenNodes(i) + 1, new Random_1.Random(parameters.getSeed())));
            }
            this.weights.push(this.allocateLayerWeights(this.K, parameters.getHiddenNodes(parameters.layerSize() - 1) + 1, new Random_1.Random(parameters.getSeed())));
            this.hiddenLayerSize = parameters.layerSize();
        }
        /**
         * The setBestWeights method creates an {@link Array} of Matrix as bestWeights and clones the values of weights {@link Array}
         * into this newly created {@link Array}.
         *
         * @return An {@link Array} clones from the weights ArrayList.
         */
        setBestWeights() {
            let bestWeights = new Array();
            for (let m of this.weights) {
                bestWeights.push(m.clone());
            }
            return bestWeights;
        }
        /**
         * Constructor that takes two {@link InstanceList} train set and validation set and {@link DeepNetworkParameter} as inputs.
         * First it sets the class labels, their sizes as K and the size of the continuous attributes as d of given train set and
         * allocates weights and sets the best weights. At each epoch, it shuffles the train set and loops through the each item of that train set,
         * it multiplies the weights Matrix with input Vector than applies the sigmoid function and stores the result as hidden and add bias.
         * Then updates weights and at the end it compares the performance of these weights with validation set. It updates the bestClassificationPerformance and
         * bestWeights according to the current situation. At the end it updates the learning rate via etaDecrease value and finishes
         * with clearing the weights.
         *
         * @param trainSet      {@link InstanceList} to be used as trainSet.
         * @param validationSet {@link InstanceList} to be used as validationSet.
         * @param parameters    {@link DeepNetworkParameter} input.
         */
        constructor1(trainSet, validationSet, parameters) {
            let tmpHidden = new Vector_1.Vector(0, 0);
            let deltaWeights = new Array();
            let hidden = new Array();
            let hiddenBiased = new Array();
            this.activationFunction = parameters.getActivationFunction();
            this.allocateWeights(parameters);
            let bestWeights = this.setBestWeights();
            let bestClassificationPerformance = new ClassificationPerformance_1.ClassificationPerformance(0.0);
            let epoch = parameters.getEpoch();
            let learningRate = parameters.getLearningRate();
            for (let i = 0; i < epoch; i++) {
                trainSet.shuffle(new Random_1.Random(parameters.getSeed()));
                for (let j = 0; j < trainSet.size(); j++) {
                    this.createInputVector(trainSet.get(j));
                    hidden = new Array();
                    hiddenBiased = new Array();
                    deltaWeights = new Array();
                    for (let k = 0; k < this.hiddenLayerSize; k++) {
                        if (k == 0) {
                            hidden.push(this.calculateHidden(this.x, this.weights[k], this.activationFunction));
                        }
                        else {
                            hidden.push(this.calculateHidden(hiddenBiased[k - 1], this.weights[k], this.activationFunction));
                        }
                        hiddenBiased.push(hidden[k].biased());
                    }
                    let rMinusY = this.calculateRMinusY(trainSet.get(j), hiddenBiased[this.hiddenLayerSize - 1], this.weights[this.weights.length - 1]);
                    deltaWeights.splice(0, 0, new Matrix_1.Matrix(rMinusY, hiddenBiased[this.hiddenLayerSize - 1]));
                    for (let k = this.weights.length - 2; k >= 0; k--) {
                        let tmph;
                        if (k == this.weights.length - 2) {
                            tmph = this.weights[k + 1].multiplyWithVectorFromLeft(rMinusY);
                        }
                        else {
                            tmph = this.weights[k + 1].multiplyWithVectorFromLeft(tmpHidden);
                        }
                        tmph.remove(0);
                        let activationDerivative;
                        switch (this.activationFunction) {
                            case ActivationFunction_1.ActivationFunction.SIGMOID:
                            default:
                                let oneMinusHidden = this.calculateOneMinusHidden(hidden[k]);
                                activationDerivative = oneMinusHidden.elementProduct(hidden[k]);
                                break;
                            case ActivationFunction_1.ActivationFunction.TANH:
                                let one = new Vector_1.Vector(hidden.length, 1.0);
                                hidden[k].tanh();
                                activationDerivative = one.difference(hidden[k].elementProduct(hidden[k]));
                                break;
                            case ActivationFunction_1.ActivationFunction.RELU:
                                hidden[k].reluDerivative();
                                activationDerivative = hidden[k];
                                break;
                        }
                        tmpHidden = tmph.elementProduct(activationDerivative);
                        if (k == 0) {
                            deltaWeights.splice(0, 0, new Matrix_1.Matrix(tmpHidden, this.x));
                        }
                        else {
                            deltaWeights.splice(0, 0, new Matrix_1.Matrix(tmpHidden, hiddenBiased[k - 1]));
                        }
                    }
                    for (let k = 0; k < this.weights.length; k++) {
                        deltaWeights[k].multiplyWithConstant(learningRate);
                        this.weights[k].add(deltaWeights[k]);
                    }
                }
                let currentClassificationPerformance = this.testClassifier(validationSet);
                if (currentClassificationPerformance.getAccuracy() > bestClassificationPerformance.getAccuracy()) {
                    bestClassificationPerformance = currentClassificationPerformance;
                    bestWeights = this.setBestWeights();
                }
                learningRate *= parameters.getEtaDecrease();
            }
            this.weights = new Array();
            for (let m of bestWeights) {
                this.weights.push(m);
            }
        }
        /**
         * Loads a deep network model from an input model file.
         * @param fileName Model file name.
         */
        constructor2(fileName) {
            let input = new FileContents_1.FileContents(fileName);
            this.loadClassLabels(input);
            this.hiddenLayerSize = parseInt(input.readLine());
            this.weights = new Array();
            for (let i = 0; i < this.hiddenLayerSize + 1; i++) {
                this.weights.push(this.loadMatrix(input));
            }
            this.activationFunction = this.loadActivationFunction(input);
        }
        /**
         * The calculateOutput method loops size of the weights times and calculate one hidden layer at a time and adds bias term.
         * At the end it updates the output y value.
         */
        calculateOutput() {
            let hiddenBiased;
            for (let i = 0; i < this.weights.length - 1; i++) {
                let hidden;
                if (i == 0) {
                    hidden = this.calculateHidden(this.x, this.weights[i], this.activationFunction);
                }
                else {
                    hidden = this.calculateHidden(hiddenBiased, this.weights[i], this.activationFunction);
                }
                hiddenBiased = hidden.biased();
            }
            this.y = this.weights[this.weights.length - 1].multiplyWithVectorFromRight(hiddenBiased);
        }
        saveTxt(fileName) {
        }
    }
    exports.DeepNetworkModel = DeepNetworkModel;
});
//# sourceMappingURL=DeepNetworkModel.js.map