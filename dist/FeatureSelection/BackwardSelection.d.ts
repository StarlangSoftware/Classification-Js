import { SubSetSelection } from "./SubSetSelection";
import { FeatureSubSet } from "./FeatureSubSet";
export declare class BackwardSelection extends SubSetSelection {
    /**
     * Constructor that creates a new {@link FeatureSubSet} and initializes indexList with given number of features.
     *
     * @param numberOfFeatures Indicates the indices of indexList.
     */
    constructor(numberOfFeatures: number);
    /**
     * The operator method calls backward method which starts with all the features and removes the least significant feature at each iteration.
     *
     * @param current          FeatureSubset that will be added to new ArrayList.
     * @param numberOfFeatures Indicates the indices of indexList.
     * @return ArrayList of FeatureSubSets created from backward.
     */
    protected operator(current: FeatureSubSet, numberOfFeatures: number): Array<FeatureSubSet>;
}
