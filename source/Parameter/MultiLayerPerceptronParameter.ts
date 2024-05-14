import {LinearPerceptronParameter} from "./LinearPerceptronParameter";
import {ActivationFunction} from "./ActivationFunction";

export class MultiLayerPerceptronParameter extends LinearPerceptronParameter{

    private readonly hiddenNodes: number
    private readonly activationFunction: ActivationFunction

    /**
     * Parameters of the multi layer perceptron algorithm.
     *
     * @param seed                 Seed is used for random number generation.
     * @param learningRate         Double value for learning rate of the algorithm.
     * @param etaDecrease          Double value for decrease in eta of the algorithm.
     * @param crossValidationRatio Double value for cross validation ratio of the algorithm.
     * @param epoch                Integer value for epoch number of the algorithm.
     * @param hiddenNodes          Integer value for the number of hidden nodes.
     * @param activationFunction   Activation function
     */
    constructor(seed: number,
                learningRate: number,
                etaDecrease: number,
                crossValidationRatio: number,
                epoch: number,
                hiddenNodes: number,
                activationFunction: ActivationFunction) {
        super(seed, learningRate, etaDecrease, crossValidationRatio, epoch);
        this.hiddenNodes = hiddenNodes
        this.activationFunction = activationFunction
    }

    /**
     * Accessor for the hiddenNodes.
     *
     * @return The hiddenNodes.
     */
    getHiddenNodes(): number{
        return this.hiddenNodes
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