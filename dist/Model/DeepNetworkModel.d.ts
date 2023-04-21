import { NeuralNetworkModel } from "./NeuralNetworkModel";
import { DeepNetworkParameter } from "../Parameter/DeepNetworkParameter";
import { InstanceList } from "../InstanceList/InstanceList";
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
    constructor1(trainSet: InstanceList, validationSet: InstanceList, parameters: DeepNetworkParameter): void;
    constructor2(fileName: string): void;
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
    constructor(trainSetOrFileName: InstanceList | string, validationSet?: InstanceList, parameters?: DeepNetworkParameter);
    /**
     * The calculateOutput method loops size of the weights times and calculate one hidden layer at a time and adds bias term.
     * At the end it updates the output y value.
     */
    protected calculateOutput(): void;
    saveTxt(fileName: string): void;
}
