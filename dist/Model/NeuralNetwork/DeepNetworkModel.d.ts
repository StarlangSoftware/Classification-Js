import { NeuralNetworkModel } from "./NeuralNetworkModel";
import { InstanceList } from "../../InstanceList/InstanceList";
import { Parameter } from "../../Parameter/Parameter";
export declare class DeepNetworkModel extends NeuralNetworkModel {
    private weights;
    private hiddenLayerSize;
    private activationFunction;
    /**
     * The allocateWeights method takes {@link DeepNetworkParameter}s as an input. First it adds random weights to the {@link Array}
     * of {@link Matrix} weights' first layer. Then it loops through the layers and adds random weights till the last layer.
     * At the end it adds random weights to the last layer and also sets the hiddenLayerSize value.
     *
     * @param parameters {@link DeepNetworkParameter} input.
     */
    private allocateWeights;
    /**
     * The setBestWeights method creates an {@link Array} of Matrix as bestWeights and clones the values of weights {@link Array}
     * into this newly created {@link Array}.
     *
     * @return An {@link Array} clones from the weights ArrayList.
     */
    private setBestWeights;
    /**
     * Loads a deep network model from an input model file.
     * @param fileName Model file name.
     */
    constructor2(fileName: string): void;
    /**
     * The calculateOutput method loops size of the weights times and calculate one hidden layer at a time and adds bias term.
     * At the end it updates the output y value.
     */
    protected calculateOutput(): void;
    saveTxt(fileName: string): void;
    /**
     * Training algorithm for deep network classifier.
     *
     * @param train  Training data given to the algorithm.
     * @param params Parameters of the deep network algorithm. crossValidationRatio and seed are used as parameters.
     * @throws DiscreteFeaturesNotAllowed Exception for discrete features.
     */
    train(train: InstanceList, params: Parameter): void;
    /**
     * Loads the deep network model from an input file.
     * @param fileName File name of the deep network model.
     */
    loadModel(fileName: string): void;
}
