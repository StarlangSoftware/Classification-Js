import { LaryFilter } from "./LaryFilter";
import { Instance } from "../Instance/Instance";
import { DataSet } from "../DataSet/DataSet";
export declare class LaryToBinary extends LaryFilter {
    /**
     * Converts the data definition with L-ary discrete attributes, to data definition with binary discrete attributes.
     */
    convertDataDefinition(): void;
    /**
     * Converts discrete attributes of a single instance to binary discrete version using 1-of-L encoding. For example, if
     * an attribute has values red, green, blue; this attribute will be converted to 3 binary attributes where
     * red will have the value true false false, green will have the value false true false, and blue will have the value false false true.
     *
     * @param instance The instance to be converted.
     */
    convertInstance(instance: Instance): void;
    /**
     * Constructor for L-ary discrete to binary discrete filter.
     *
     * @param dataSet The instances whose L-ary discrete attributes will be converted to binary discrete attributes.
     */
    constructor(dataSet: DataSet);
}
