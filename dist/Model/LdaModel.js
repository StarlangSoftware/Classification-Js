(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "./GaussianModel"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.LdaModel = void 0;
    const GaussianModel_1 = require("./GaussianModel");
    class LdaModel extends GaussianModel_1.GaussianModel {
        /**
         * A constructor which sets the priorDistribution, w and w0 according to given inputs.
         *
         * @param priorDistribution {@link DiscreteDistribution} input.
         * @param w                 {@link HashMap} of String and Vectors.
         * @param w0                {@link HashMap} of String and Double.
         */
        constructor(priorDistribution, w, w0) {
            super();
            this.priorDistribution = priorDistribution;
            this.w = w;
            this.w0 = w0;
        }
        /**
         * The calculateMetric method takes an {@link Instance} and a String as inputs. It returns the dot product of given Instance
         * and wi plus w0i.
         *
         * @param instance {@link Instance} input.
         * @param Ci       String input.
         * @return The dot product of given Instance and wi plus w0i.
         */
        calculateMetric(instance, Ci) {
            let xi = instance.toVector();
            let wi = this.w.get(Ci);
            let w0i = this.w0.get(Ci);
            return wi.dotProduct(xi) + w0i;
        }
    }
    exports.LdaModel = LdaModel;
});
//# sourceMappingURL=LdaModel.js.map