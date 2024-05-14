(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "./StatisticalTestResultType"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.PairedTest = void 0;
    const StatisticalTestResultType_1 = require("./StatisticalTestResultType");
    class PairedTest {
        /**
         * Compares two classification algorithms based on their performances (accuracy or error rate). The method first
         * checks the null hypothesis mu1 < mu2, if the test rejects this null hypothesis with alpha level of confidence, it
         * decides mu1 > mu2. The algorithm then checks the null hypothesis mu1 > mu2, if the test rejects that null
         * hypothesis with alpha level of confidence, if decides mu1 < mu2. If none of the two tests are rejected, it can not
         * make a decision about the performances of algorithms.
         * @param classifier1 Performance (error rate or accuracy) results of the first classifier.
         * @param classifier2 Performance (error rate or accuracy) results of the second classifier.
         * @param alpha Alpha level defined for the statistical test.
         * @return 1 if the performance of the first algorithm is larger than the second algorithm, -1 if the performance of
         * the second algorithm is larger than the first algorithm, 0 if they have similar performance.
         */
        compare(classifier1, classifier2, alpha) {
            let testResult1 = this.compareClassifiers(classifier1, classifier2);
            let testResult2 = this.compareClassifiers(classifier2, classifier1);
            let testResultType1 = testResult1.oneTailed(alpha);
            let testResultType2 = testResult2.oneTailed(alpha);
            if (testResultType1 == StatisticalTestResultType_1.StatisticalTestResultType.REJECT) {
                return 1;
            }
            else {
                if (testResultType2 == StatisticalTestResultType_1.StatisticalTestResultType.REJECT) {
                    return -1;
                }
                else {
                    return 0;
                }
            }
        }
    }
    exports.PairedTest = PairedTest;
});
//# sourceMappingURL=PairedTest.js.map