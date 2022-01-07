(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "./PairedTest", "./StatisticalTestResult"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Sign = void 0;
    const PairedTest_1 = require("./PairedTest");
    const StatisticalTestResult_1 = require("./StatisticalTestResult");
    class Sign extends PairedTest_1.PairedTest {
        factorial(n) {
            let result = 1;
            for (let i = 2; i <= n; i++)
                result *= i;
            return result;
        }
        binomial(m, n) {
            if (n == 0 || m == n) {
                return 1;
            }
            else {
                return this.factorial(m) / (this.factorial(n) * this.factorial(m - n));
            }
        }
        compareClassifiers(classifier1, classifier2) {
            let plus = 0, minus = 0;
            for (let i = 0; i < classifier1.numberOfExperiments(); i++) {
                if (classifier1.getErrorRate(i) < classifier2.getErrorRate(i)) {
                    plus++;
                }
                else {
                    if (classifier1.getErrorRate(i) > classifier2.getErrorRate(i)) {
                        minus++;
                    }
                }
            }
            let total = plus + minus;
            let pValue = 0.0;
            for (let i = 0; i <= plus; i++) {
                pValue += this.binomial(total, i) / Math.pow(2, total);
            }
            return new StatisticalTestResult_1.StatisticalTestResult(pValue, false);
        }
    }
    exports.Sign = Sign;
});
//# sourceMappingURL=Sign.js.map