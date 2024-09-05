import {LinearPerceptronModel} from "./LinearPerceptronModel";
import {Matrix} from "nlptoolkit-math/dist/Matrix";
import {ActivationFunction} from "../../Parameter/ActivationFunction";
import {InstanceList} from "../../InstanceList/InstanceList";
import {MultiLayerPerceptronParameter} from "../../Parameter/MultiLayerPerceptronParameter";
import {ClassificationPerformance} from "../../Performance/ClassificationPerformance";
import {Vector} from "nlptoolkit-math/dist/Vector";
import {Random} from "nlptoolkit-util/dist/Random";
import {FileContents} from "nlptoolkit-util/dist/FileContents";
import {Parameter} from "../../Parameter/Parameter";
import {Partition} from "../../InstanceList/Partition";

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
     * Loads a multi-layer perceptron model from an input model file.
     * @param fileName Model file name.
     */
    constructor2(fileName: string){
        let input = new FileContents(fileName)
        this.loadClassLabels(input)
        this.W = this.loadMatrix(input)
        this.V = this.loadMatrix(input)
        this.activationFunction = this.loadActivationFunction(input)
    }

    /**
     * The calculateOutput method calculates the forward single hidden layer by using Matrices W and V.
     */
    protected calculateOutput() {
        this.calculateForwardSingleHiddenLayer(this.W, this.V, this.activationFunction);
    }

    saveTxt(fileName: string){
    }

    /**
     * Training algorithm for the multilayer perceptron algorithm. 20 percent of the data is separated as cross-validation
     * data used for selecting the best weights. 80 percent of the data is used for training the multilayer perceptron with
     * gradient descent.
     *
     * @param train   Training data given to the algorithm
     * @param params Parameters of the multilayer perceptron.
     */
    train(train: InstanceList, params: Parameter): void {
        this.initialize(train)
        let parameters = (<MultiLayerPerceptronParameter> params)
        let partition = new Partition(train, parameters.getCrossValidationRatio(), true);
        let trainSet = partition.get(1)
        let validationSet = partition.get(1)
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
     * Loads the multi-layer perceptron model from an input file.
     * @param fileName File name of the multi-layer perceptron model.
     */
    loadModel(fileName: string): void{
        this.constructor2(fileName)
    }

}