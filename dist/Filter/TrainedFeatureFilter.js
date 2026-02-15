"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TrainedFeatureFilter = void 0;
const FeatureFilter_1 = require("./FeatureFilter");
class TrainedFeatureFilter extends FeatureFilter_1.FeatureFilter {
    /**
     * Constructor that sets the dataSet.
     *
     * @param dataSet DataSet that will be used.
     */
    constructor(dataSet) {
        super(dataSet);
    }
}
exports.TrainedFeatureFilter = TrainedFeatureFilter;
//# sourceMappingURL=TrainedFeatureFilter.js.map