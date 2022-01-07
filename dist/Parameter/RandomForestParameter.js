(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "./BaggingParameter"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.RandomForestParameter = void 0;
    const BaggingParameter_1 = require("./BaggingParameter");
    class RandomForestParameter extends BaggingParameter_1.BaggingParameter {
        /**
         * Parameters of the random forest classifier.
         *
         * @param seed                Seed is used for random number generation.
         * @param ensembleSize        The number of trees in the bagged forest.
         * @param attributeSubsetSize Integer value for the size of attribute subset.
         */
        constructor(seed, ensembleSize, attributeSubsetSize) {
            super(seed, ensembleSize);
            this.attributeSubsetSize = attributeSubsetSize;
        }
        /**
         * Accessor for the attributeSubsetSize.
         *
         * @return The attributeSubsetSize.
         */
        getAttributeSubsetSize() {
            return this.attributeSubsetSize;
        }
    }
    exports.RandomForestParameter = RandomForestParameter;
});
//# sourceMappingURL=RandomForestParameter.js.map