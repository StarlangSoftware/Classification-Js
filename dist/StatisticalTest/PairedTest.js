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