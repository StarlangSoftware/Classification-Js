"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DiscreteToIndexed = void 0;
const LaryFilter_1 = require("./LaryFilter");
const DiscreteIndexedAttribute_1 = require("../Attribute/DiscreteIndexedAttribute");
const AttributeType_1 = require("../Attribute/AttributeType");
class DiscreteToIndexed extends LaryFilter_1.LaryFilter {
    /**
     * Converts the data definition with discrete attributes, to data definition with DISCRETE_INDEXED attributes.
     */
    convertDataDefinition() {
        let dataDefinition = this.dataSet.getDataDefinition();
        let size = dataDefinition.attributeCount();
        for (let i = 0; i < size; i++) {
            if (this.attributeDistributions[i].size > 0) {
                dataDefinition.addAttribute(AttributeType_1.AttributeType.DISCRETE_INDEXED);
            }
        }
        this.removeDiscreteAttributesFromDataDefinition(size);
    }
    /**
     * Converts discrete attributes of a single instance to indexed version.
     *
     * @param instance The instance to be converted.
     */
    convertInstance(instance) {
        let size = instance.attributeSize();
        for (let i = 0; i < size; i++) {
            if (this.attributeDistributions[i].size > 0) {
                let index = this.attributeDistributions[i].getIndex(instance.getAttribute(i).toString());
                instance.addAttribute(new DiscreteIndexedAttribute_1.DiscreteIndexedAttribute(instance.getAttribute(i).toString(), index, this.attributeDistributions[i].size));
            }
        }
        this.removeDiscreteAttributesFromInstance(instance, size);
    }
    /**
     * Constructor for discrete to indexed filter.
     *
     * @param dataSet The dataSet whose instances whose discrete attributes will be converted to indexed attributes
     */
    constructor(dataSet) {
        super(dataSet);
    }
}
exports.DiscreteToIndexed = DiscreteToIndexed;
//# sourceMappingURL=DiscreteToIndexed.js.map