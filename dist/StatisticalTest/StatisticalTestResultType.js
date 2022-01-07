(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.StatisticalTestResultType = void 0;
    /***
     * Enumerator class for statistical test results.
     */
    var StatisticalTestResultType;
    (function (StatisticalTestResultType) {
        StatisticalTestResultType[StatisticalTestResultType["FAILED_TO_REJECT"] = 0] = "FAILED_TO_REJECT";
        StatisticalTestResultType[StatisticalTestResultType["REJECT"] = 1] = "REJECT";
    })(StatisticalTestResultType = exports.StatisticalTestResultType || (exports.StatisticalTestResultType = {}));
});
//# sourceMappingURL=StatisticalTestResultType.js.map