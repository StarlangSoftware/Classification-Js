(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "./Parameter"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.BaggingParameter = void 0;
    const Parameter_1 = require("./Parameter");
    class BaggingParameter extends Parameter_1.Parameter {
        /**
         * Parameters of the bagging trees algorithm.
         *
         * @param seed         Seed is used for random number generation.
         * @param ensembleSize The number of trees in the bagged forest.
         */
        constructor(seed, ensembleSize) {
            super(seed);
            this.ensembleSize = ensembleSize;
        }
        /**
         * Accessor for the ensemble size.
         *
         * @return The ensemble size.
         */
        getEnsembleSize() {
            return this.ensembleSize;
        }
    }
    exports.BaggingParameter = BaggingParameter;
});
//# sourceMappingURL=BaggingParameter.js.map