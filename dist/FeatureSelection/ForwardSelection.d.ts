import { SubSetSelection } from "./SubSetSelection";
import { FeatureSubSet } from "./FeatureSubSet";
export declare class ForwardSelection extends SubSetSelection {
    /**
     * Constructor that creates a new {@link FeatureSubSet}.
     */
    constructor();
    /**
     * The operator method calls forward method which starts with having no feature in the model. In each iteration,
     * it keeps adding the features that are not currently listed.
     *
     * @param current          FeatureSubset that will be added to new ArrayList.
     * @param numberOfFeatures Indicates the indices of indexList.
     * @return ArrayList of FeatureSubSets created from forward.
     */
    protected operator(current: FeatureSubSet, numberOfFeatures: number): Array<FeatureSubSet>;
}
