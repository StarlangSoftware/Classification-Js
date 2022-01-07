import {LaryFilter} from "./LaryFilter";
import {Instance} from "../Instance/Instance";
import {DataSet} from "../DataSet/DataSet";
import {DiscreteIndexedAttribute} from "../Attribute/DiscreteIndexedAttribute";
import {AttributeType} from "../Attribute/AttributeType";

export class DiscreteToIndexed extends LaryFilter{

    /**
     * Converts the data definition with discrete attributes, to data definition with DISCRETE_INDEXED attributes.
     */
    convertDataDefinition(): void {
        let dataDefinition = this.dataSet.getDataDefinition();
        let size = dataDefinition.attributeCount();
        for (let i = 0; i < size; i++) {
            if (this.attributeDistributions[i].size > 0) {
                dataDefinition.addAttribute(AttributeType.DISCRETE_INDEXED);
            }
        }
        this.removeDiscreteAttributesFromDataDefinition(size);
    }

    /**
     * Converts discrete attributes of a single instance to indexed version.
     *
     * @param instance The instance to be converted.
     */
    convertInstance(instance: Instance): void {
        let size = instance.attributeSize();
        for (let i = 0; i < size; i++) {
            if (this.attributeDistributions[i].size > 0) {
                let index = this.attributeDistributions[i].getIndex(instance.getAttribute(i).toString());
                instance.addAttribute(new DiscreteIndexedAttribute(instance.getAttribute(i).toString(), index,
                    this.attributeDistributions[i].size));
            }
        }
        this.removeDiscreteAttributesFromInstance(instance, size);
    }

    /**
     * Constructor for discrete to indexed filter.
     *
     * @param dataSet The dataSet whose instances whose discrete attributes will be converted to indexed attributes
     */
    constructor(dataSet: DataSet) {
        super(dataSet);
    }
}