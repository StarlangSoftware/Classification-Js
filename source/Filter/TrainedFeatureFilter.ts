import {FeatureFilter} from "./FeatureFilter";
import {DataSet} from "../DataSet/DataSet";

export abstract class TrainedFeatureFilter extends FeatureFilter{

    protected abstract train(): void;

    /**
     * Constructor that sets the dataSet.
     *
     * @param dataSet DataSet that will be used.
     */
    constructor(dataSet: DataSet) {
        super(dataSet);
    }

}