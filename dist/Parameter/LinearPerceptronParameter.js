"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LinearPerceptronParameter = void 0;
const Parameter_1 = require("./Parameter");
class LinearPerceptronParameter extends Parameter_1.Parameter {
    learningRate;
    etaDecrease;
    crossValidationRatio;
    epoch;
    /**
     * Parameters of the linear perceptron algorithm.
     *
     * @param seed                 Seed is used for random number generation.
     * @param learningRate         Double value for learning rate of the algorithm.
     * @param etaDecrease          Double value for decrease in eta of the algorithm.
     * @param crossValidationRatio Double value for cross validation ratio of the algorithm.
     * @param epoch                Integer value for epoch number of the algorithm.
     */
    constructor(seed, learningRate, etaDecrease, crossValidationRatio, epoch) {
        super(seed);
        this.learningRate = learningRate;
        this.etaDecrease = etaDecrease;
        this.crossValidationRatio = crossValidationRatio;
        this.epoch = epoch;
    }
    /**
     * Accessor for the learningRate.
     *
     * @return The learningRate.
     */
    getLearningRate() {
        return this.learningRate;
    }
    /**
     * Accessor for the etaDecrease.
     *
     * @return The etaDecrease.
     */
    getEtaDecrease() {
        return this.etaDecrease;
    }
    /**
     * Accessor for the crossValidationRatio.
     *
     * @return The crossValidationRatio.
     */
    getCrossValidationRatio() {
        return this.crossValidationRatio;
    }
    /**
     * Accessor for the epoch.
     *
     * @return The epoch.
     */
    getEpoch() {
        return this.epoch;
    }
}
exports.LinearPerceptronParameter = LinearPerceptronParameter;
//# sourceMappingURL=LinearPerceptronParameter.js.map