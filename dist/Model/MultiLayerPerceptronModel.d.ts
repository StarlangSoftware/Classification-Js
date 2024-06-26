import { LinearPerceptronModel } from "./LinearPerceptronModel";
import { ActivationFunction } from "../Parameter/ActivationFunction";
import { InstanceList } from "../InstanceList/InstanceList";
import { MultiLayerPerceptronParameter } from "../Parameter/MultiLayerPerceptronParameter";
export declare class MultiLayerPerceptronModel extends LinearPerceptronModel {
    private V;
    protected activationFunction: ActivationFunction;
    /**
     * The allocateWeights method allocates layers' weights of Matrix W and V.
     *
     * @param H Integer value for weights.
     * @param random Random function to set weights.
     */
    private allocateWeights;
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
    constructor1(trainSet: InstanceList, validationSet?: InstanceList, parameters?: MultiLayerPerceptronParameter): void;
    /**
     * Loads a multi-layer perceptron model from an input model file.
     * @param fileName Model file name.
     */
    constructor2(fileName: string): void;
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
    constructor(trainSetOrFileName: InstanceList | string, validationSet?: InstanceList, parameters?: MultiLayerPerceptronParameter);
    /**
     * The calculateOutput method calculates the forward single hidden layer by using Matrices W and V.
     */
    protected calculateOutput(): void;
    saveTxt(fileName: string): void;
}
