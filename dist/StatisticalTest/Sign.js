"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Sign = void 0;
const PairedTest_1 = require("./PairedTest");
const StatisticalTestResult_1 = require("./StatisticalTestResult");
class Sign extends PairedTest_1.PairedTest {
    /**
     * Calculates n!.
     * @param n n is n!
     * @return n!.
     */
    factorial(n) {
        let result = 1;
        for (let i = 2; i <= n; i++)
            result *= i;
        return result;
    }
    /**
     * Calculates m of n that is C(n, m)
     * @param m m in C(m, n)
     * @param n n in C(m, n)
     * @return C(m, n)
     */
    binomial(m, n) {
        if (n == 0 || m == n) {
            return 1;
        }
        else {
            return this.factorial(m) / (this.factorial(n) * this.factorial(m - n));
        }
    }
    /**
     * Compares two classification algorithms based on their performances (accuracy or error rate) using sign test.
     * @param classifier1 Performance (error rate or accuracy) results of the first classifier.
     * @param classifier2 Performance (error rate or accuracy) results of the second classifier.
     * @return Statistical test result of the comparison.
     */
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
//# sourceMappingURL=Sign.js.map