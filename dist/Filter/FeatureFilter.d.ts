import { DataSet } from "../DataSet/DataSet";
import { Instance } from "../Instance/Instance";
export declare abstract class FeatureFilter {
    protected dataSet: DataSet;
    abstract convertInstance(instance: Instance): void;
    abstract convertDataDefinition(): void;
    /**
     * Constructor that sets the dataSet.
     *
     * @param dataSet DataSet that will bu used.
     */
    constructor(dataSet: DataSet);
    /**
     * Feature converter for a list of instances. Using the abstract method convertInstance, each instance in the
     * instance list will be converted.
     */
    convert(): void;
}
