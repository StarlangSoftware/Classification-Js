import {SubSetSelection} from "./SubSetSelection";
import {FeatureSubSet} from "./FeatureSubSet";

export class FloatingSelection extends SubSetSelection{

    /**
     * Constructor that creates a new {@link FeatureSubSet}.
     */
    constructor() {
        super(new FeatureSubSet());
    }

    /**
     * The operator method calls forward and backward methods.
     *
     * @param current          {@link FeatureSubSet} input.
     * @param numberOfFeatures Indicates the indices of indexList.
     * @return ArrayList of FeatureSubSet.
     */
    protected operator(current: FeatureSubSet, numberOfFeatures: number): Array<FeatureSubSet> {
        let result = new Array<FeatureSubSet>();
        this.forward(result, current, numberOfFeatures);
        this.backward(result, current);
        return result;
    }

}