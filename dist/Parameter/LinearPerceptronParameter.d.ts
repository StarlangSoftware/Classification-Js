import { Parameter } from "./Parameter";
export declare class LinearPerceptronParameter extends Parameter {
    private learningRate;
    private etaDecrease;
    private crossValidationRatio;
    private epoch;
    /**
     * Parameters of the linear perceptron algorithm.
     *
     * @param seed                 Seed is used for random number generation.
     * @param learningRate         Double value for learning rate of the algorithm.
     * @param etaDecrease          Double value for decrease in eta of the algorithm.
     * @param crossValidationRatio Double value for cross validation ratio of the algorithm.
     * @param epoch                Integer value for epoch number of the algorithm.
     */
    constructor(seed: number, learningRate: number, etaDecrease: number, crossValidationRatio: number, epoch: number);
    /**
     * Accessor for the learningRate.
     *
     * @return The learningRate.
     */
    getLearningRate(): number;
    /**
     * Accessor for the etaDecrease.
     *
     * @return The etaDecrease.
     */
    getEtaDecrease(): number;
    /**
     * Accessor for the crossValidationRatio.
     *
     * @return The crossValidationRatio.
     */
    getCrossValidationRatio(): number;
    /**
     * Accessor for the epoch.
     *
     * @return The epoch.
     */
    getEpoch(): number;
}
