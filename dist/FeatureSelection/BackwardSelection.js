"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BackwardSelection = void 0;
const SubSetSelection_1 = require("./SubSetSelection");
const FeatureSubSet_1 = require("./FeatureSubSet");
class BackwardSelection extends SubSetSelection_1.SubSetSelection {
    /**
     * Constructor that creates a new {@link FeatureSubSet} and initializes indexList with given number of features.
     *
     * @param numberOfFeatures Indicates the indices of indexList.
     */
    constructor(numberOfFeatures) {
        super(new FeatureSubSet_1.FeatureSubSet(numberOfFeatures));
    }
    /**
     * The operator method calls backward method which starts with all the features and removes the least significant feature at each iteration.
     *
     * @param current          FeatureSubset that will be added to new ArrayList.
     * @param numberOfFeatures Indicates the indices of indexList.
     * @return ArrayList of FeatureSubSets created from backward.
     */
    operator(current, numberOfFeatures) {
        let result = new Array();
        this.backward(result, current);
        return result;
    }
}
exports.BackwardSelection = BackwardSelection;
//# sourceMappingURL=BackwardSelection.js.map