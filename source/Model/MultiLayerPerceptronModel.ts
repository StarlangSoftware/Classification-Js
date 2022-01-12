import {LinearPerceptronModel} from "./LinearPerceptronModel";
import {Matrix} from "nlptoolkit-math/dist/Matrix";
import {ActivationFunction} from "../Parameter/ActivationFunction";
import {InstanceList} from "../InstanceList/InstanceList";
import {MultiLayerPerceptronParameter} from "../Parameter/MultiLayerPerceptronParameter";
import {ClassificationPerformance} from "../Performance/ClassificationPerformance";
import {Vector} from "nlptoolkit-math/dist/Vector";
import {Random} from "nlptoolkit-util/dist/Random";

export class MultiLayerPerceptronModel extends LinearPerceptronModel{

    private V: Matrix
    protected activationFunction: ActivationFunction

    /**
     * The allocateWeights method allocates layers' weights of Matrix W and V.
     *
     * @param H Integer value for weights.
     * @param random Random function to set weights.
     */
    private allocateWeights(H: number, random: Random){
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
    constructor(trainSet: InstanceList, validationSet: InstanceList, parameters: MultiLayerPerceptronParameter) {
        super(trainSet);
        this.activationFunction = parameters.getActivationFunction();
        this.allocateWeights(parameters.getHiddenNodes(), new Random(parameters.getSeed()));
        let bestW = this.W.clone();
        let bestV = this.V.clone();
        let bestClassificationPerformance = new ClassificationPerformance(0.0);
        let epoch = parameters.getEpoch();
        let learningRate = parameters.getLearningRate();
        for (let i = 0; i < epoch; i++) {
            trainSet.shuffle(new Random(parameters.getSeed()));
            for (let j = 0; j < trainSet.size(); j++) {
                this.createInputVector(trainSet.get(j));
                let hidden = this.calculateHidden(this.x, this.W, this.activationFunction);
                let hiddenBiased = hidden.biased();
                let rMinusY = this.calculateRMinusY(trainSet.get(j), hiddenBiased, this.V);
                let deltaV = new Matrix(rMinusY, hiddenBiased);
                let tmph = this.V.multiplyWithVectorFromLeft(rMinusY);
                tmph.remove(0);
                let activationDerivative
                switch (this.activationFunction){
                    case ActivationFunction.SIGMOID:
                    default:
                        let oneMinusHidden = this.calculateOneMinusHidden(hidden);
                        activationDerivative = oneMinusHidden.elementProduct(hidden);
                        break;
                    case ActivationFunction.TANH:
                        let one = new Vector(hidden.size(), 1.0);
                        hidden.tanh();
                        activationDerivative = one.difference(hidden.elementProduct(hidden));
                        break;
                    case ActivationFunction.RELU:
                        hidden.reluDerivative();
                        activationDerivative = hidden;
                        break;
                }
                let tmpHidden = tmph.elementProduct(activationDerivative);
                let deltaW = new Matrix(tmpHidden, this.x);
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
     * The calculateOutput method calculates the forward single hidden layer by using Matrices W and V.
     */
    protected calculateOutput() {
        this.calculateForwardSingleHiddenLayer(this.W, this.V, this.activationFunction);
    }
}