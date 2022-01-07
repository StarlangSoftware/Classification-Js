import { Parameter } from "./Parameter";
export declare class BaggingParameter extends Parameter {
    protected ensembleSize: number;
    /**
     * Parameters of the bagging trees algorithm.
     *
     * @param seed         Seed is used for random number generation.
     * @param ensembleSize The number of trees in the bagged forest.
     */
    constructor(seed: number, ensembleSize: number);
    /**
     * Accessor for the ensemble size.
     *
     * @return The ensemble size.
     */
    getEnsembleSize(): number;
}
