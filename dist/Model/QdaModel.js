(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "./LdaModel", "nlptoolkit-math/dist/DiscreteDistribution", "nlptoolkit-util/dist/FileContents"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.QdaModel = void 0;
    const LdaModel_1 = require("./LdaModel");
    const DiscreteDistribution_1 = require("nlptoolkit-math/dist/DiscreteDistribution");
    const FileContents_1 = require("nlptoolkit-util/dist/FileContents");
    class QdaModel extends LdaModel_1.LdaModel {
        /**
         * The constructor which sets the priorDistribution, w w1 and HashMap of String Matrix.
         *
         * @param priorDistributionOrFileName {@link DiscreteDistribution} input.
         * @param W                 {@link HashMap} of String and Matrix.
         * @param w                 {@link HashMap} of String and Vectors.
         * @param w0                {@link HashMap} of String and Double.
         */
        constructor(priorDistributionOrFileName, W, w, w0) {
            if (priorDistributionOrFileName instanceof DiscreteDistribution_1.DiscreteDistribution) {
                super(priorDistributionOrFileName, w, w0);
                this.W = W;
            }
            else {
                super();
                let input = new FileContents_1.FileContents(priorDistributionOrFileName);
                let size = this.loadPriorDistribution(input);
                this.loadWandW0(input, size);
                this.W = new Map();
                for (let i = 0; i < size; i++) {
                    let c = input.readLine();
                    let matrix = this.loadMatrix(input);
                    this.W.set(c, matrix);
                }
            }
        }
        /**
         * The calculateMetric method takes an {@link Instance} and a String as inputs. It multiplies Matrix Wi with Vector xi
         * then calculates the dot product of it with xi. Then, again it finds the dot product of wi and xi and returns the summation with w0i.
         *
         * @param instance {@link Instance} input.
         * @param Ci       String input.
         * @return The result of Wi.multiplyWithVectorFromLeft(xi).dotProduct(xi) + wi.dotProduct(xi) + w0i.
         */
        calculateMetric(instance, Ci) {
            let xi = instance.toVector();
            let Wi = this.W.get(Ci);
            let wi = this.w.get(Ci);
            let w0i = this.w0.get(Ci);
            return Wi.multiplyWithVectorFromLeft(xi).dotProduct(xi) + wi.dotProduct(xi) + w0i;
        }
        saveTxt(fileName) {
        }
    }
    exports.QdaModel = QdaModel;
});
//# sourceMappingURL=QdaModel.js.map