(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "./Parameter", "../DistanceMetric/EuclidianDistance"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.KMeansParameter = void 0;
    const Parameter_1 = require("./Parameter");
    const EuclidianDistance_1 = require("../DistanceMetric/EuclidianDistance");
    class KMeansParameter extends Parameter_1.Parameter {
        /**
         * * Parameters of the K Means classifier.
         *
         * @param seed           Seed is used for random number generation.
         * @param distanceMetric distance metric used to calculate the distance between two instances.
         */
        constructor(seed, distanceMetric) {
            super(seed);
            if (distanceMetric == undefined) {
                this.distanceMetric = new EuclidianDistance_1.EuclidianDistance();
            }
            else {
                this.distanceMetric = distanceMetric;
            }
        }
        /**
         * Accessor for the distanceMetric.
         *
         * @return The distanceMetric.
         */
        getDistanceMetric() {
            return this.distanceMetric;
        }
    }
    exports.KMeansParameter = KMeansParameter;
});
//# sourceMappingURL=KMeansParameter.js.map