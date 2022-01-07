import { FeatureFilter } from "./FeatureFilter";
import { Instance } from "../Instance/Instance";
import { DataSet } from "../DataSet/DataSet";
export declare class Normalize extends FeatureFilter {
    private averageInstance;
    private standardDeviationInstance;
    /**
     * Constructor for normalize feature filter. It calculates and stores the mean (m) and standard deviation (s) of
     * the sample.
     *
     * @param dataSet Instances whose continuous attribute values will be normalized.
     */
    constructor(dataSet: DataSet);
    convertDataDefinition(): void;
    /**
     * Normalizes the continuous attributes of a single instance. For all i, new x_i = (x_i - m_i) / s_i.
     *
     * @param instance Instance whose attributes will be normalized.
     */
    convertInstance(instance: Instance): void;
}
