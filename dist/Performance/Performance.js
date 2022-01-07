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
    exports.Performance = void 0;
    class Performance {
        /**
         * Constructor that sets the error rate.
         *
         * @param errorRate Double input.
         */
        constructor(errorRate) {
            this.errorRate = errorRate;
        }
        /**
         * Accessor for the error rate.
         *
         * @return Double errorRate.
         */
        getErrorRate() {
            return this.errorRate;
        }
    }
    exports.Performance = Performance;
});
//# sourceMappingURL=Performance.js.map