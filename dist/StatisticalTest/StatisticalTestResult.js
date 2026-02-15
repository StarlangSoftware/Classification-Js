"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StatisticalTestResult = void 0;
const StatisticalTestResultType_1 = require("./StatisticalTestResultType");
class StatisticalTestResult {
    pValue;
    onlyTwoTailed;
    /**
     * Constructor of the StatisticalTestResult. It sets the attribute values.
     * @param pValue p value of the statistical test result
     * @param onlyTwoTailed True, if this test applicable only two tailed tests, false otherwise.
     */
    constructor(pValue, onlyTwoTailed) {
        this.pValue = pValue;
        this.onlyTwoTailed = onlyTwoTailed;
    }
    /**
     * Returns reject or failed to reject, depending on the alpha level and p value of the statistical test that checks
     * one tailed null hypothesis such as mu1 < mu2. If p value is less than the alpha level, the test rejects the null
     * hypothesis. Otherwise, it fails to reject the null hypothesis.
     * @param alpha Alpha level of the test
     * @return If p value is less than the alpha level, the test rejects the null hypothesis. Otherwise, it fails to
     * reject the null hypothesis.
     */
    oneTailed(alpha) {
        if (!this.onlyTwoTailed) {
            if (this.pValue < alpha) {
                return StatisticalTestResultType_1.StatisticalTestResultType.REJECT;
            }
            else {
                return StatisticalTestResultType_1.StatisticalTestResultType.FAILED_TO_REJECT;
            }
        }
    }
    /**
     * Returns reject or failed to reject, depending on the alpha level and p value of the statistical test that checks
     * one tailed null hypothesis such as mu1 < mu2 or two tailed null hypothesis such as mu1 = mu2. If the null
     * hypothesis is two tailed, and p value is less than the alpha level, the test rejects the null hypothesis.
     * Otherwise, it fails to reject the null hypothesis. If the null  hypothesis is one tailed, and p value is less
     * than alpha / 2 or p value is larger than 1 - alpha / 2, the test  rejects the null  hypothesis. Otherwise, it
     * fails to reject the null hypothesis.
     * @param alpha Alpha level of the test
     * @return If the null  hypothesis is two tailed, and p value is less than the alpha level, the test rejects the
     * null hypothesis.  Otherwise, it fails to reject the null hypothesis. If the null  hypothesis is one tailed, and
     * p value is less  than alpha / 2 or p value is larger than 1 - alpha / 2, the test  rejects the null  hypothesis.
     * Otherwise, it  fails to reject the null hypothesis.
     */
    twoTailed(alpha) {
        if (this.onlyTwoTailed) {
            if (this.pValue < alpha) {
                return StatisticalTestResultType_1.StatisticalTestResultType.REJECT;
            }
            else {
                return StatisticalTestResultType_1.StatisticalTestResultType.FAILED_TO_REJECT;
            }
        }
        else {
            if (this.pValue < alpha / 2 || this.pValue > 1 - alpha / 2) {
                return StatisticalTestResultType_1.StatisticalTestResultType.REJECT;
            }
            else {
                return StatisticalTestResultType_1.StatisticalTestResultType.FAILED_TO_REJECT;
            }
        }
    }
    /**
     * Accessor for the p value of the statistical test result.
     * @return p value of the statistical test result
     */
    getPValue() {
        return this.pValue;
    }
}
exports.StatisticalTestResult = StatisticalTestResult;
//# sourceMappingURL=StatisticalTestResult.js.map