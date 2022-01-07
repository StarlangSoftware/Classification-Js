import { LaryFilter } from "./LaryFilter";
import { Instance } from "../Instance/Instance";
import { DataSet } from "../DataSet/DataSet";
export declare class DiscreteToIndexed extends LaryFilter {
    /**
     * Converts the data definition with discrete attributes, to data definition with DISCRETE_INDEXED attributes.
     */
    convertDataDefinition(): void;
    /**
     * Converts discrete attributes of a single instance to indexed version.
     *
     * @param instance The instance to be converted.
     */
    convertInstance(instance: Instance): void;
    /**
     * Constructor for discrete to indexed filter.
     *
     * @param dataSet The dataSet whose instances whose discrete attributes will be converted to indexed attributes
     */
    constructor(dataSet: DataSet);
}
