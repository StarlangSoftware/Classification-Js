import {LaryFilter} from "./LaryFilter";
import {Instance} from "../Instance/Instance";
import {DataSet} from "../DataSet/DataSet";
import {ContinuousAttribute} from "../Attribute/ContinuousAttribute";
import {AttributeType} from "../Attribute/AttributeType";

export class DiscreteToContinuous extends LaryFilter{

    /**
     * Converts the data definition with discrete attributes, to data definition with continuous attributes. Basically,
     * for each discrete attribute with L possible values, L more continuous attributes will be added.
     */
    convertDataDefinition(): void {
        let dataDefinition = this.dataSet.getDataDefinition();
        let size = dataDefinition.attributeCount();
        for (let i = 0; i < size; i++) {
            if (this.attributeDistributions[i].size > 0) {
                for (let j = 0; j < this.attributeDistributions[i].size; j++) {
                    dataDefinition.addAttribute(AttributeType.CONTINUOUS);
                }
            }
        }
        this.removeDiscreteAttributesFromDataDefinition(size);
    }

    /**
     * Converts discrete attributes of a single instance to continuous version using 1-of-L encoding. For example, if
     * an attribute has values red, green, blue; this attribute will be converted to 3 continuous attributes where
     * red will have the value 100, green will have the value 010, and blue will have the value 001.
     *
     * @param instance The instance to be converted.
     */
    convertInstance(instance: Instance): void {
        let size = instance.attributeSize();
        for (let i = 0; i < size; i++) {
            if (this.attributeDistributions[i].size > 0) {
                let index = this.attributeDistributions[i].getIndex(instance.getAttribute(i).toString());
                for (let j = 0; j < this.attributeDistributions[i].size; j++) {
                    if (j != index) {
                        instance.addAttribute(new ContinuousAttribute(0));
                    } else {
                        instance.addAttribute(new ContinuousAttribute(1));
                    }
                }
            }
        }
        this.removeDiscreteAttributesFromInstance(instance, size);
    }

    /**
     * Constructor for discrete to continuous filter.
     *
     * @param dataSet The dataSet whose instances whose discrete attributes will be converted to continuous attributes using
     *                1-of-L encoding.
     */
    constructor(dataSet: DataSet) {
        super(dataSet);
    }
}