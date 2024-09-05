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
    exports.KnnInstance = void 0;
    class KnnInstance {
        /**
         * The constructor that sets the instance and distance value.
         *
         * @param instance {@link Instance} input.
         * @param distance Double distance value.
         */
        constructor(instance, distance) {
            this.instance = instance;
            this.distance = distance;
        }
        getInstance() {
            return this.instance;
        }
        getDistance() {
            return this.distance;
        }
    }
    exports.KnnInstance = KnnInstance;
});
//# sourceMappingURL=KnnInstance.js.map