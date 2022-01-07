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
    exports.Parameter = void 0;
    class Parameter {
        /**
         * Constructor of {@link Parameter} class which assigns given seed value to seed.
         *
         * @param seed Seed is used for random number generation.
         */
        constructor(seed) {
            this.seed = seed;
        }
        /**
         * Accessor for the seed.
         *
         * @return The seed.
         */
        getSeed() {
            return this.seed;
        }
    }
    exports.Parameter = Parameter;
});
//# sourceMappingURL=Parameter.js.map