"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FloatingSelection = void 0;
const SubSetSelection_1 = require("./SubSetSelection");
const FeatureSubSet_1 = require("./FeatureSubSet");
class FloatingSelection extends SubSetSelection_1.SubSetSelection {
    /**
     * Constructor that creates a new {@link FeatureSubSet}.
     */
    constructor() {
        super(new FeatureSubSet_1.FeatureSubSet());
    }
    /**
     * The operator method calls forward and backward methods.
     *
     * @param current          {@link FeatureSubSet} input.
     * @param numberOfFeatures Indicates the indices of indexList.
     * @return ArrayList of FeatureSubSet.
     */
    operator(current, numberOfFeatures) {
        let result = new Array();
        this.forward(result, current, numberOfFeatures);
        this.backward(result, current);
        return result;
    }
}
exports.FloatingSelection = FloatingSelection;
//# sourceMappingURL=FloatingSelection.js.map