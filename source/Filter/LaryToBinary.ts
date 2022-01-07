import {LaryFilter} from "./LaryFilter";
import {Instance} from "../Instance/Instance";
import {DataSet} from "../DataSet/DataSet";
import {BinaryAttribute} from "../Attribute/BinaryAttribute";
import {AttributeType} from "../Attribute/AttributeType";

export class LaryToBinary extends LaryFilter{

    /**
     * Converts the data definition with L-ary discrete attributes, to data definition with binary discrete attributes.
     */
    convertDataDefinition(): void {
        let dataDefinition = this.dataSet.getDataDefinition();
        let size = dataDefinition.attributeCount();
        for (let i = 0; i < size; i++) {
            if (this.attributeDistributions[i].size > 0) {
                for (let j = 0; j < this.attributeDistributions[i].size; j++) {
                    dataDefinition.addAttribute(AttributeType.BINARY);
                }
            }
        }
        this.removeDiscreteAttributesFromDataDefinition(size);
    }

    /**
     * Converts discrete attributes of a single instance to binary discrete version using 1-of-L encoding. For example, if
     * an attribute has values red, green, blue; this attribute will be converted to 3 binary attributes where
     * red will have the value true false false, green will have the value false true false, and blue will have the value false false true.
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
                        instance.addAttribute(new BinaryAttribute(false));
                    } else {
                        instance.addAttribute(new BinaryAttribute(true));
                    }
                }
            }
        }
        this.removeDiscreteAttributesFromInstance(instance, size);
    }

    /**
     * Constructor for L-ary discrete to binary discrete filter.
     *
     * @param dataSet The instances whose L-ary discrete attributes will be converted to binary discrete attributes.
     */
    constructor(dataSet: DataSet) {
        super(dataSet);
    }
}