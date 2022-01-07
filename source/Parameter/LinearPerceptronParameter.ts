import {Parameter} from "./Parameter";

export class LinearPerceptronParameter extends Parameter{

    private learningRate: number
    private etaDecrease: number
    private crossValidationRatio: number
    private epoch: number

    /**
     * Parameters of the linear perceptron algorithm.
     *
     * @param seed                 Seed is used for random number generation.
     * @param learningRate         Double value for learning rate of the algorithm.
     * @param etaDecrease          Double value for decrease in eta of the algorithm.
     * @param crossValidationRatio Double value for cross validation ratio of the algorithm.
     * @param epoch                Integer value for epoch number of the algorithm.
     */
    constructor(seed: number,
                learningRate: number,
                etaDecrease: number,
                crossValidationRatio: number,
                epoch: number) {
        super(seed);
        this.learningRate = learningRate
        this.etaDecrease = etaDecrease
        this.crossValidationRatio = crossValidationRatio
        this.epoch = epoch
    }

    /**
     * Accessor for the learningRate.
     *
     * @return The learningRate.
     */
    getLearningRate(): number{
        return this.learningRate
    }

    /**
     * Accessor for the etaDecrease.
     *
     * @return The etaDecrease.
     */
    getEtaDecrease(): number{
        return this.etaDecrease
    }

    /**
     * Accessor for the crossValidationRatio.
     *
     * @return The crossValidationRatio.
     */
    getCrossValidationRatio(): number{
        return this.crossValidationRatio
    }

    /**
     * Accessor for the epoch.
     *
     * @return The epoch.
     */
    getEpoch(): number{
        return this.epoch
    }
}