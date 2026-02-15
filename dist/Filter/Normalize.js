"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Normalize = void 0;
const FeatureFilter_1 = require("./FeatureFilter");
const ContinuousAttribute_1 = require("../Attribute/ContinuousAttribute");
class Normalize extends FeatureFilter_1.FeatureFilter {
    averageInstance;
    standardDeviationInstance;
    /**
     * Constructor for normalize feature filter. It calculates and stores the mean (m) and standard deviation (s) of
     * the sample.
     *
     * @param dataSet Instances whose continuous attribute values will be normalized.
     */
    constructor(dataSet) {
        super(dataSet);
        this.averageInstance = dataSet.getInstanceList().average();
        this.standardDeviationInstance = dataSet.getInstanceList().standardDeviation();
    }
    convertDataDefinition() {
    }
    /**
     * Normalizes the continuous attributes of a single instance. For all i, new x_i = (x_i - m_i) / s_i.
     *
     * @param instance Instance whose attributes will be normalized.
     */
    convertInstance(instance) {
        for (let i = 0; i < instance.attributeSize(); i++) {
            if (instance.getAttribute(i) instanceof ContinuousAttribute_1.ContinuousAttribute) {
                let xi = instance.getAttribute(i);
                let mi = this.averageInstance.getAttribute(i);
                let si = this.standardDeviationInstance.getAttribute(i);
                xi.setValue((xi.getValue() - mi.getValue()) / si.getValue());
            }
        }
    }
}
exports.Normalize = Normalize;
//# sourceMappingURL=Normalize.js.map