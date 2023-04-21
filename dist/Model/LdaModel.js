(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "./GaussianModel", "nlptoolkit-math/dist/DiscreteDistribution", "nlptoolkit-util/dist/FileContents"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.LdaModel = void 0;
    const GaussianModel_1 = require("./GaussianModel");
    const DiscreteDistribution_1 = require("nlptoolkit-math/dist/DiscreteDistribution");
    const FileContents_1 = require("nlptoolkit-util/dist/FileContents");
    class LdaModel extends GaussianModel_1.GaussianModel {
        /**
         * A constructor which sets the priorDistribution, w and w0 according to given inputs.
         *
         * @param priorDistributionOrFileName {@link DiscreteDistribution} input.
         * @param w                 {@link HashMap} of String and Vectors.
         * @param w0                {@link HashMap} of String and Double.
         */
        constructor(priorDistributionOrFileName, w, w0) {
            super();
            if (priorDistributionOrFileName instanceof DiscreteDistribution_1.DiscreteDistribution) {
                this.priorDistribution = priorDistributionOrFileName;
                this.w = w;
                this.w0 = w0;
            }
            else {
                if (priorDistributionOrFileName != undefined) {
                    let input = new FileContents_1.FileContents(priorDistributionOrFileName);
                    let size = this.loadPriorDistribution(input);
                    this.loadWandW0(input, size);
                }
            }
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
        loadWandW0(input, size) {
            this.w0 = new Map();
            for (let i = 0; i < size; i++) {
                let line = input.readLine();
                let items = line.split(" ");
                this.w0.set(items[0], parseFloat(items[1]));
            }
            this.w = this.loadVectors(input, size);
        }
        saveTxt(fileName) {
        }
    }
    exports.LdaModel = LdaModel;
});
//# sourceMappingURL=LdaModel.js.map