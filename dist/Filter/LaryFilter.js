"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LaryFilter = void 0;
const FeatureFilter_1 = require("./FeatureFilter");
class LaryFilter extends FeatureFilter_1.FeatureFilter {
    attributeDistributions;
    /**
     * Constructor that sets the dataSet and all the attributes distributions.
     *
     * @param dataSet DataSet that will be used.
     */
    constructor(dataSet) {
        super(dataSet);
        this.attributeDistributions = dataSet.getInstanceList().allAttributesDistribution();
    }
    /**
     * The removeDiscreteAttributes method takes an {@link Instance} as an input, and removes the discrete attributes from
     * given instance.
     *
     * @param instance Instance to removes attributes from.
     * @param size     Size of the given instance.
     */
    removeDiscreteAttributesFromInstance(instance, size) {
        let k = 0;
        for (let i = 0; i < size; i++) {
            if (this.attributeDistributions[i].size > 0) {
                instance.removeAttribute(k);
            }
            else {
                k++;
            }
        }
    }
    /**
     * The removeDiscreteAttributes method removes the discrete attributes from dataDefinition.
     *
     * @param size Size of item that attributes will be removed.
     */
    removeDiscreteAttributesFromDataDefinition(size) {
        let dataDefinition = this.dataSet.getDataDefinition();
        let k = 0;
        for (let i = 0; i < size; i++) {
            if (this.attributeDistributions[i].size > 0) {
                dataDefinition.removeAttribute(k);
            }
            else {
                k++;
            }
        }
    }
}
exports.LaryFilter = LaryFilter;
//# sourceMappingURL=LaryFilter.js.map