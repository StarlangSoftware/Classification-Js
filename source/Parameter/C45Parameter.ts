import {Parameter} from "./Parameter";

export class C45Parameter extends Parameter{

    private readonly prune: boolean
    private readonly crossValidationRatio: number

    /**
     * Parameters of the C4.5 univariate decision tree classifier.
     *
     * @param seed                 Seed is used for random number generation.
     * @param prune                Boolean value for prune.
     * @param crossValidationRatio Double value for cross crossValidationRatio ratio.
     */
    constructor(seed: number, prune: boolean, crossValidationRatio: number) {
        super(seed);
        this.prune = prune
        this.crossValidationRatio = crossValidationRatio
    }

    /**
     * Accessor for the prune.
     *
     * @return Prune.
     */
    isPrune(): boolean{
        return this.prune
    }

    /**
     * Accessor for the crossValidationRatio.
     *
     * @return crossValidationRatio.
     */
    getCrossValidationRatio(): number{
        return this.crossValidationRatio
    }
}