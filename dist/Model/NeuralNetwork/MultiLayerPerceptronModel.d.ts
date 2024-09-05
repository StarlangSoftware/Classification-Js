import { LinearPerceptronModel } from "./LinearPerceptronModel";
import { ActivationFunction } from "../../Parameter/ActivationFunction";
import { InstanceList } from "../../InstanceList/InstanceList";
import { Parameter } from "../../Parameter/Parameter";
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
     * Loads a multi-layer perceptron model from an input model file.
     * @param fileName Model file name.
     */
    constructor2(fileName: string): void;
    /**
     * The calculateOutput method calculates the forward single hidden layer by using Matrices W and V.
     */
    protected calculateOutput(): void;
    saveTxt(fileName: string): void;
    /**
     * Training algorithm for the multilayer perceptron algorithm. 20 percent of the data is separated as cross-validation
     * data used for selecting the best weights. 80 percent of the data is used for training the multilayer perceptron with
     * gradient descent.
     *
     * @param train   Training data given to the algorithm
     * @param params Parameters of the multilayer perceptron.
     */
    train(train: InstanceList, params: Parameter): void;
    /**
     * Loads the multi-layer perceptron model from an input file.
     * @param fileName File name of the multi-layer perceptron model.
     */
    loadModel(fileName: string): void;
}
