import { LaryFilter } from "./LaryFilter";
import { Instance } from "../Instance/Instance";
import { DataSet } from "../DataSet/DataSet";
export declare class DiscreteToContinuous extends LaryFilter {
    /**
     * Converts the data definition with discrete attributes, to data definition with continuous attributes. Basically,
     * for each discrete attribute with L possible values, L more continuous attributes will be added.
     */
    convertDataDefinition(): void;
    /**
     * Converts discrete attributes of a single instance to continuous version using 1-of-L encoding. For example, if
     * an attribute has values red, green, blue; this attribute will be converted to 3 continuous attributes where
     * red will have the value 100, green will have the value 010, and blue will have the value 001.
     *
     * @param instance The instance to be converted.
     */
    convertInstance(instance: Instance): void;
    /**
     * Constructor for discrete to continuous filter.
     *
     * @param dataSet The dataSet whose instances whose discrete attributes will be converted to continuous attributes using
     *                1-of-L encoding.
     */
    constructor(dataSet: DataSet);
}
