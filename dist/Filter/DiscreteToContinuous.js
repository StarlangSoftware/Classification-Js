"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DiscreteToContinuous = void 0;
const LaryFilter_1 = require("./LaryFilter");
const ContinuousAttribute_1 = require("../Attribute/ContinuousAttribute");
const AttributeType_1 = require("../Attribute/AttributeType");
class DiscreteToContinuous extends LaryFilter_1.LaryFilter {
    /**
     * Converts the data definition with discrete attributes, to data definition with continuous attributes. Basically,
     * for each discrete attribute with L possible values, L more continuous attributes will be added.
     */
    convertDataDefinition() {
        let dataDefinition = this.dataSet.getDataDefinition();
        let size = dataDefinition.attributeCount();
        for (let i = 0; i < size; i++) {
            if (this.attributeDistributions[i].size > 0) {
                for (let j = 0; j < this.attributeDistributions[i].size; j++) {
                    dataDefinition.addAttribute(AttributeType_1.AttributeType.CONTINUOUS);
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
    convertInstance(instance) {
        let size = instance.attributeSize();
        for (let i = 0; i < size; i++) {
            if (this.attributeDistributions[i].size > 0) {
                let index = this.attributeDistributions[i].getIndex(instance.getAttribute(i).toString());
                for (let j = 0; j < this.attributeDistributions[i].size; j++) {
                    if (j != index) {
                        instance.addAttribute(new ContinuousAttribute_1.ContinuousAttribute(0));
                    }
                    else {
                        instance.addAttribute(new ContinuousAttribute_1.ContinuousAttribute(1));
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
    constructor(dataSet) {
        super(dataSet);
    }
}
exports.DiscreteToContinuous = DiscreteToContinuous;
//# sourceMappingURL=DiscreteToContinuous.js.map