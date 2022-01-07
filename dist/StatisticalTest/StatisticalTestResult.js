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
    exports.StatisticalTestResult = void 0;
    const StatisticalTestResultType_1 = require("./StatisticalTestResultType");
    class StatisticalTestResult {
        constructor(pValue, onlyTwoTailed) {
            this.pValue = pValue;
            this.onlyTwoTailed = onlyTwoTailed;
        }
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
        getPValue() {
            return this.pValue;
        }
    }
    exports.StatisticalTestResult = StatisticalTestResult;
});
//# sourceMappingURL=StatisticalTestResult.js.map