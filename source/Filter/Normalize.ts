import {FeatureFilter} from "./FeatureFilter";
import {Instance} from "../Instance/Instance";
import {DataSet} from "../DataSet/DataSet";
import {ContinuousAttribute} from "../Attribute/ContinuousAttribute";

export class Normalize extends FeatureFilter{

    private averageInstance: Instance
    private standardDeviationInstance: Instance

    /**
     * Constructor for normalize feature filter. It calculates and stores the mean (m) and standard deviation (s) of
     * the sample.
     *
     * @param dataSet Instances whose continuous attribute values will be normalized.
     */
    constructor(dataSet: DataSet) {
        super(dataSet);
        this.averageInstance = dataSet.getInstanceList().average();
        this.standardDeviationInstance = dataSet.getInstanceList().standardDeviation();
    }

    convertDataDefinition(): void {
    }

    /**
     * Normalizes the continuous attributes of a single instance. For all i, new x_i = (x_i - m_i) / s_i.
     *
     * @param instance Instance whose attributes will be normalized.
     */
    convertInstance(instance: Instance): void {
        for (let i = 0; i < instance.attributeSize(); i++) {
            if (instance.getAttribute(i) instanceof ContinuousAttribute) {
                let xi = <ContinuousAttribute> instance.getAttribute(i);
                let mi = <ContinuousAttribute> this.averageInstance.getAttribute(i);
                let si = <ContinuousAttribute> this.standardDeviationInstance.getAttribute(i);
                xi.setValue((xi.getValue() - mi.getValue()) / si.getValue());
            }
        }
    }

}