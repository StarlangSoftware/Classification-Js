(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "./KMeansParameter"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.KnnParameter = void 0;
    const KMeansParameter_1 = require("./KMeansParameter");
    class KnnParameter extends KMeansParameter_1.KMeansParameter {
        /**
         * Parameters of the K-nearest neighbor classifier.
         *
         * @param seed           Seed is used for random number generation.
         * @param k              Parameter of the K-nearest neighbor algorithm.
         * @param distanceMetric Used to calculate the distance between two instances.
         */
        constructor(seed, k, distanceMetric) {
            super(seed, distanceMetric);
            this.k = k;
        }
        /**
         * Accessor for the k.
         *
         * @return Value of the k.
         */
        getK() {
            return this.k;
        }
    }
    exports.KnnParameter = KnnParameter;
});
//# sourceMappingURL=KnnParameter.js.map