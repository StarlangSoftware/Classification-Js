"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.C45Parameter = void 0;
const Parameter_1 = require("./Parameter");
class C45Parameter extends Parameter_1.Parameter {
    prune;
    crossValidationRatio;
    /**
     * Parameters of the C4.5 univariate decision tree classifier.
     *
     * @param seed                 Seed is used for random number generation.
     * @param prune                Boolean value for prune.
     * @param crossValidationRatio Double value for cross crossValidationRatio ratio.
     */
    constructor(seed, prune, crossValidationRatio) {
        super(seed);
        this.prune = prune;
        this.crossValidationRatio = crossValidationRatio;
    }
    /**
     * Accessor for the prune.
     *
     * @return Prune.
     */
    isPrune() {
        return this.prune;
    }
    /**
     * Accessor for the crossValidationRatio.
     *
     * @return crossValidationRatio.
     */
    getCrossValidationRatio() {
        return this.crossValidationRatio;
    }
}
exports.C45Parameter = C45Parameter;
//# sourceMappingURL=C45Parameter.js.map