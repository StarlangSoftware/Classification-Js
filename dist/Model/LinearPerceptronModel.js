(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "./NeuralNetworkModel", "nlptoolkit-math/dist/Matrix", "../InstanceList/InstanceList", "../Performance/ClassificationPerformance", "nlptoolkit-util/dist/Random", "nlptoolkit-util/dist/FileContents"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.LinearPerceptronModel = void 0;
    const NeuralNetworkModel_1 = require("./NeuralNetworkModel");
    const Matrix_1 = require("nlptoolkit-math/dist/Matrix");
    const InstanceList_1 = require("../InstanceList/InstanceList");
    const ClassificationPerformance_1 = require("../Performance/ClassificationPerformance");
    const Random_1 = require("nlptoolkit-util/dist/Random");
    const FileContents_1 = require("nlptoolkit-util/dist/FileContents");
    class LinearPerceptronModel extends NeuralNetworkModel_1.NeuralNetworkModel {
        /**
         * Constructor that takes {@link InstanceList}s as trainsSet and validationSet. Initially it allocates layer weights,
         * then creates an input vector by using given trainSet and finds error. Via the validationSet it finds the classification
         * performance and at the end it reassigns the allocated weight Matrix with the matrix that has the best accuracy.
         *
         * @param trainSetOrFileName      InstanceList that is used to train.
         * @param validationSet InstanceList that is used to validate.
         * @param parameters    Linear perceptron parameters; learningRate, etaDecrease, crossValidationRatio, epoch.
         */
        constructor(trainSetOrFileName, validationSet, parameters) {
            if (trainSetOrFileName instanceof InstanceList_1.InstanceList) {
                if (validationSet != undefined) {
                    super(trainSetOrFileName);
                    this.constructor1(trainSetOrFileName, validationSet, parameters);
                }
                else {
                    super(trainSetOrFileName);
                }
            }
            else {
                if (trainSetOrFileName != undefined) {
                    super();
                    this.constructor2(trainSetOrFileName);
                }
                else {
                    super();
                }
            }
        }
        constructor1(trainSet, validationSet, parameters) {
            if (validationSet != undefined) {
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
        }
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
    }
    exports.LinearPerceptronModel = LinearPerceptronModel;
});
//# sourceMappingURL=LinearPerceptronModel.js.map