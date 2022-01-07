import {DataSet} from "../DataSet/DataSet";
import {Instance} from "../Instance/Instance";

export abstract class FeatureFilter {

    protected dataSet: DataSet

    abstract convertInstance(instance: Instance): void
    abstract convertDataDefinition(): void

    /**
     * Constructor that sets the dataSet.
     *
     * @param dataSet DataSet that will bu used.
     */
    constructor(dataSet: DataSet) {
        this.dataSet = dataSet
    }

    /**
     * Feature converter for a list of instances. Using the abstract method convertInstance, each instance in the
     * instance list will be converted.
     */
    convert(){
        let instances = this.dataSet.getInstances();
        for (let instance of instances) {
            this.convertInstance(instance);
        }
        this.convertDataDefinition();
    }
}