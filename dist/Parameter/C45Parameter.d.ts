import { Parameter } from "./Parameter";
export declare class C45Parameter extends Parameter {
    private prune;
    private crossValidationRatio;
    /**
     * Parameters of the C4.5 univariate decision tree classifier.
     *
     * @param seed                 Seed is used for random number generation.
     * @param prune                Boolean value for prune.
     * @param crossValidationRatio Double value for cross crossValidationRatio ratio.
     */
    constructor(seed: number, prune: boolean, crossValidationRatio: number);
    /**
     * Accessor for the prune.
     *
     * @return Prune.
     */
    isPrune(): boolean;
    /**
     * Accessor for the crossValidationRatio.
     *
     * @return crossValidationRatio.
     */
    getCrossValidationRatio(): number;
}
