import {LinearPerceptronParameter} from "./LinearPerceptronParameter";
import {ActivationFunction} from "./ActivationFunction";

export class DeepNetworkParameter extends LinearPerceptronParameter{
    private hiddenLayers: Array<number>
    private activationFunction: ActivationFunction

    /**
     * Parameters of the deep network classifier.
     *
     * @param seed                 Seed is used for random number generation.
     * @param learningRate         Double value for learning rate of the algorithm.
     * @param etaDecrease          Double value for decrease in eta of the algorithm.
     * @param crossValidationRatio Double value for cross validation ratio of the algorithm.
     * @param epoch                Integer value for epoch number of the algorithm.
     * @param hiddenLayers         An integer {@link Array} for hidden layers of the algorithm.
     * @param activationFunction   Activation function
     */
    constructor(seed: number,
                learningRate: number,
                etaDecrease: number,
                crossValidationRatio: number,
                epoch: number,
                hiddenLayers: Array<number>,
                activationFunction: ActivationFunction) {
        super(seed, learningRate, etaDecrease, crossValidationRatio, epoch);
        this.hiddenLayers = hiddenLayers
        this.activationFunction = activationFunction
    }

    /**
     * The layerSize method returns the size of the hiddenLayers {@link Array}.
     *
     * @return The size of the hiddenLayers {@link Array}.
     */
    layerSize(): number{
        return this.hiddenLayers.length
    }

    /**
     * The getHiddenNodes method takes a layer index as an input and returns the element at the given index of hiddenLayers
     * {@link Array}.
     *
     * @param layerIndex Index of the layer.
     * @return The element at the layerIndex of hiddenLayers {@link Array}.
     */
    getHiddenNodes(layerIndex: number): number{
        return this.hiddenLayers[layerIndex]
    }

    /**
     * Accessor for the activation function.
     *
     * @return The activation function.
     */
    getActivationFunction(): ActivationFunction{
        return this.activationFunction
    }
}