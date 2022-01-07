import {Parameter} from "./Parameter";

export class BaggingParameter extends Parameter{

    protected ensembleSize: number

    /**
     * Parameters of the bagging trees algorithm.
     *
     * @param seed         Seed is used for random number generation.
     * @param ensembleSize The number of trees in the bagged forest.
     */
    constructor(seed: number, ensembleSize: number) {
        super(seed);
        this.ensembleSize = ensembleSize
    }

    /**
     * Accessor for the ensemble size.
     *
     * @return The ensemble size.
     */
    getEnsembleSize(): number{
        return this.ensembleSize
    }
}