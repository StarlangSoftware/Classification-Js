"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BinaryAttribute = void 0;
const DiscreteAttribute_1 = require("./DiscreteAttribute");
class BinaryAttribute extends DiscreteAttribute_1.DiscreteAttribute {
    /**
     * Constructor for a binary discrete attribute. The attribute can take only two values "True" or "False".
     *
     * @param value Value of the attribute. Can be true or false.
     */
    constructor(value) {
        super(value == true ? "1" : "0");
    }
}
exports.BinaryAttribute = BinaryAttribute;
//# sourceMappingURL=BinaryAttribute.js.map