(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "./Attribute"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.DiscreteAttribute = void 0;
    const Attribute_1 = require("./Attribute");
    class DiscreteAttribute extends Attribute_1.Attribute {
        /**
         * Constructor for a discrete attribute.
         *
         * @param value Value of the attribute.
         */
        constructor(value) {
            super();
            this.value = "NULL";
            this.value = value;
        }
        /**
         * Accessor method for value.
         *
         * @return value
         */
        getValue() {
            return this.value;
        }
        /**
         * Converts value to {@link String}.
         *
         * @return String representation of value.
         */
        toString() {
            if (this.value == ",") {
                return "comma";
            }
            return this.value;
        }
        continuousAttributeSize() {
            return 0;
        }
        continuousAttributes() {
            return new Array();
        }
    }
    exports.DiscreteAttribute = DiscreteAttribute;
});
//# sourceMappingURL=DiscreteAttribute.js.map