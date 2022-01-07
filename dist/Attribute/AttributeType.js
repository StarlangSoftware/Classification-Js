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
    exports.AttributeType = void 0;
    var AttributeType;
    (function (AttributeType) {
        /**
         * Continuous Attribute
         */
        AttributeType[AttributeType["CONTINUOUS"] = 0] = "CONTINUOUS";
        /**
         * Discrete Attribute
         */
        AttributeType[AttributeType["DISCRETE"] = 1] = "DISCRETE";
        /**
         * Binary Attribute
         */
        AttributeType[AttributeType["BINARY"] = 2] = "BINARY";
        /**
         * Discrete Indexed Attribute is used to store the indices.
         */
        AttributeType[AttributeType["DISCRETE_INDEXED"] = 3] = "DISCRETE_INDEXED";
    })(AttributeType = exports.AttributeType || (exports.AttributeType = {}));
});
//# sourceMappingURL=AttributeType.js.map