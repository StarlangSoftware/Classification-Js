import { BaggingParameter } from "./BaggingParameter";
export declare class RandomForestParameter extends BaggingParameter {
    attributeSubsetSize: number;
    /**
     * Parameters of the random forest classifier.
     *
     * @param seed                Seed is used for random number generation.
     * @param ensembleSize        The number of trees in the bagged forest.
     * @param attributeSubsetSize Integer value for the size of attribute subset.
     */
    constructor(seed: number, ensembleSize: number, attributeSubsetSize: number);
    /**
     * Accessor for the attributeSubsetSize.
     *
     * @return The attributeSubsetSize.
     */
    getAttributeSubsetSize(): number;
}
